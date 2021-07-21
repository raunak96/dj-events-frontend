import EventItem from "components/EventItem";
import Layout from "components/Layout";
import events from "components/data";

const EventsPage = ({ events }) => {
	return (
		<Layout>
			<h1>Upcoming Events</h1>
			{events.length === 0 ? (
				<h3>No events to show</h3>
			) : (
				events.map(event => <EventItem key={event.id} evt={event} />)
			)}
		</Layout>
	);
};

export default EventsPage;

export async function getStaticProps(context) {
	return {
		props: { events },
		revalidate: 1,
	};
}
