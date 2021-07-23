import axios from "axios";
import EventItem from "components/EventItem";
import Layout from "components/Layout";
import { API_URL } from "config";
import debounce from "lodash/debounce";
import qs from "qs";
import { useMemo, useRef, useState } from "react";
import styles from "styles/Events.module.css";

const EventsPage = ({ events }) => {
	const searchRef = useRef("");
	const [eventsState, setEvents] = useState({
		filteredEvents: events,
		searchTerm: "",
	});
	const { filteredEvents, searchTerm } = eventsState;

	const debouncedSearch = useMemo(
		() =>
			debounce(async term => {
				try {
					const query = qs.stringify({
						_where: {
							_or: [
								{ name_contains: term },
								{ performers_contains: term },
								{ description_contains: term },
								{ venue_contains: term },
							],
						},
					});
					const { data } = await axios.get(
						`${API_URL}/events?${query}`
					);
					setEvents({ filteredEvents: data, searchTerm: term });
				} catch (err) {
					console.log(err);
				}
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
				filteredEvents.map(event => (
					<EventItem key={event.id} evt={event} />
				))
			)}
		</Layout>
	);
};

export default EventsPage;

export async function getStaticProps(context) {
	try {
		const { data: events } = await axios.get(
			`${API_URL}/events?_sort=date:asc`
		);
		return {
			props: { events },
			revalidate: 1,
		};
	} catch (err) {
		console.log(err);
		return { props: { events: [] } };
	}
}
