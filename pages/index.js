import axios from "axios";
import EventItem from "components/EventItem";
import Layout from "components/Layout";
import { API_URL } from "config/index";
import Link from "next/link";

const HomePage = ({ events }) => {
	return (
		<Layout>
			<h1>Upcoming Events</h1>
			{events.length === 0 ? (
				<h3>No events to show</h3>
			) : (
				events.map(event => <EventItem key={event.id} evt={event} />)
			)}
			{events.length > 0 && (
				<Link href="/events">
					<a className="btn-secondary">View all Events</a>
				</Link>
			)}
		</Layout>
	);
};

export default HomePage;

export async function getStaticProps(context) {
	try {
		const { data: events } = await axios.get(
			`${API_URL}/events?_sort=date:asc&_limit=3`
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
