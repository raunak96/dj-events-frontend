import EventItem from "components/EventItem";
import Layout from "components/Layout";
import events from "components/data";
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
			{events.length && (
				<Link href="/events">
					<a className="btn-secondary">View all Events</a>
				</Link>
			)}
		</Layout>
	);
};

export default HomePage;

export async function getStaticProps(context) {
	return {
		props: { events: events.slice(0, 3) },
		revalidate: 1,
	};
}
