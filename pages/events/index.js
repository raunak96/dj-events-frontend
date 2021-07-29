import axios from "axios";
import EventItem from "components/EventItem";
import Layout from "components/Layout";
import { API_URL } from "config";
import { ROWS_PER_PAGE } from "config/";
import useIntersectionObserver from "hooks/useIntersectionObserver";
import debounce from "lodash/debounce";
import { useMemo, useRef, useState } from "react";
import styles from "styles/Events.module.css";
import query from "utils";

const EventsPage = ({ events, total }) => {
	const searchRef = useRef("");
	const [eventsState, setEvents] = useState({
		filteredEvents: events,
		searchTerm: "",
	});
	const [page, setPage] = useState(0);
	const { filteredEvents, searchTerm } = eventsState;

	const hasMore = useMemo(() => {
		return total > (page + 1) * ROWS_PER_PAGE;
	}, [page, total]);
	const onIntersection = async () => {
		const nextPage = (page + 1) * ROWS_PER_PAGE;

		const { data } = await axios.get(
			`${API_URL}/events?_sort=date:asc&${query(
				searchTerm
			)}&_start=${nextPage}&_limit=${ROWS_PER_PAGE}`
		);

		setEvents(prev => ({
			...prev,
			filteredEvents: [...prev.filteredEvents, ...data],
		}));
		setPage(prev => prev + 1);
	};
	const intersectionRef = useIntersectionObserver({
		onIntersection,
		hasMore,
	});

	const debouncedSearch = useMemo(
		() =>
			debounce(async term => {
				try {
					const { data } = await axios.get(
						`${API_URL}/events?_sort=date:asc&${query(
							term
						)}&_start=0&_limit=${ROWS_PER_PAGE}`
					);
					setEvents({ filteredEvents: data, searchTerm: term });
					setPage(0);
				} catch (err) {}
			}, 800),
		[]
	);

	const handleChange = () => {
		debouncedSearch(searchRef.current.value);
	};

	return (
		<Layout>
			<div className={styles.header}>
				<h1>
					{searchTerm !== ""
						? `Search Results for ${searchTerm}`
						: "Events"}
				</h1>
				<div className={styles.searchContainer}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						// className="h-2 w-5"
						viewBox="0 0 20 20"
						fill="currentColor">
						<path
							fillRule="evenodd"
							d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
							clipRule="evenodd"
						/>
					</svg>
					<input
						className={styles.search}
						type="text"
						ref={searchRef}
						onChange={handleChange}
						placeholder="Search Events"
					/>
				</div>
			</div>
			{filteredEvents.length === 0 ? (
				<h3>No events to show</h3>
			) : (
				filteredEvents.map((event, index) => (
					<EventItem
						key={event.id}
						evt={event}
						ref={
							index === filteredEvents.length - 2
								? intersectionRef
								: null
						}
					/>
				))
			)}
		</Layout>
	);
};

export default EventsPage;

export async function getStaticProps(context) {
	try {
		const eventsPromise = axios.get(
			`${API_URL}/events?_sort=date:asc&_start=0&_limit=${ROWS_PER_PAGE}`
		);
		const countPromise = axios.get(`${API_URL}/events/count`);
		const [{ data: events }, { data: total }] = await Promise.all([
			eventsPromise,
			countPromise,
		]);

		return {
			props: { events, total },
			revalidate: 20,
		};
	} catch (err) {
		return { props: { events: [], total: 0 } };
	}
}
