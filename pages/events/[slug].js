import Layout from "components/Layout";
import styles from "styles/Event.module.css";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { API_URL } from "config/";
import EventMap from "components/EventMap";

const EventPage = ({
	evt = {
		name: "",
		id: "",
		address: "",
		description: "",
		venue: "",
		performers: "",
		date: "",
		time: "",
	},
}) => {
	return (
		<Layout title={`${evt.name} Event`}>
			<div className={styles.event}>
				<span>
					{new Date(evt.date).toDateString("en-IN")} at {evt.time}
				</span>
				<h1>{evt.name}</h1>
				<div className={styles.image}>
					<Image
						src={
							evt?.image?.formats?.large?.url ??
							"https://res.cloudinary.com/rawn/image/upload/v1627041391/large_event_default_5085837679.png"
						}
						alt="Event Image"
						width={960}
						height={600}
						objectFit="cover"
					/>
				</div>

				<h3>Performers</h3>
				<p>{evt.performers}</p>
				<h3>Description:</h3>
				<p>{evt.description}</p>
				<h3>Venue: {evt.venue}</h3>
				<p>{evt.address}</p>
				<EventMap evt={evt} />
				<Link href="/events">
					<a className={styles.back}>{"<"} Go Back</a>
				</Link>
			</div>
		</Layout>
	);
};

export default EventPage;

export async function getStaticPaths() {
	try {
		const { data: events } = await axios.get(`${API_URL}/events`);
		const paths = events.map(event => ({ params: { slug: event.slug } }));
		return {
			paths: paths,
			fallback: "blocking",
		};
	} catch (err) {
		return { paths: [{ params: { slug: "" } }], fallback: "blocking" };
	}
}

export async function getStaticProps({ params }) {
	try {
		const { data: events } = await axios.get(
			`${API_URL}/events?_slug=${params.slug}`
		);
		return {
			props: { evt: events[0] },
			revalidate: 20,
		};
	} catch (err) {
		return {
			props: {
				evt: {
					name: "",
					id: "",
					address: "",
					description: "",
					venue: "",
					performers: "",
					date: "",
					time: "",
				},
			},
		};
	}
}
