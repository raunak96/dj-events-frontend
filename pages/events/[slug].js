import { useRouter } from "next/router";
import Layout from "components/Layout";
import styles from "styles/Event.module.css";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { API_URL } from "config/";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const EventPage = ({ evt }) => {
	const router = useRouter();

	const deleteEvent = async () => {
		if (confirm("Are you sure you want to delete?")) {
			try {
				await axios.delete(`${API_URL}/events/${evt.id}`);
				router.push("/events");
			} catch (err) {
				toast.error(err.response.data);
			}
		}
	};

	return (
		<Layout title={`${evt.name} Event`}>
			<div className={styles.event}>
				<div className={styles.controls}>
					<Link href={`/events/edit/${evt.id}`}>
						<a>
							<FaPencilAlt /> Edit Event
						</a>
					</Link>
					<a href="#" className={styles.delete} onClick={deleteEvent}>
						<FaTimes /> Delete Event
					</a>
				</div>
				<span>
					{new Date(evt.date).toDateString("en-IN")} at {evt.time}
				</span>
				<h1>{evt.name}</h1>
				<ToastContainer />
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
			fallback: false,
		};
	} catch (err) {
		console.log(err);
		return { paths: [{ params: { slug: "" } }], fallback: false };
	}
}

export async function getStaticProps({ params }) {
	try {
		const { data: events } = await axios.get(
			`${API_URL}/events?_slug=${params.slug}`
		);
		return {
			props: { evt: events[0] },
			revalidate: 1,
		};
	} catch (err) {
		console.log(err);
		return { props: { evt: {} } };
	}
}
