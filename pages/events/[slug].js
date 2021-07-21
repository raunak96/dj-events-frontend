import { useRouter } from "next/router";
import Layout from "components/Layout";
import events from "components/data";
import styles from "styles/Event.module.css";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

const EventPage = ({ evt }) => {
	const router = useRouter();

	const deleteEvent = () => {
		console.log("Delete");
	};

	return (
		<Layout
			title={`${
				router.query.slug ? `${router.query.slug} - ` : ""
			} Event`}>
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
					{evt.date} at ${evt.time}
				</span>
				<h1>{evt.name}</h1>
				{evt.image && (
					<div className={styles.image}>
						<Image
							src={evt.image}
							alt="Event Image"
							width={960}
							height={600}
						/>
					</div>
				)}
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
	const paths = events.map(event => ({ params: { slug: event.slug } }));
	return {
		paths: paths,
		fallback: false,
	};
}

export async function getStaticProps({ params }) {
	const evt = events.find(evt => evt.slug === params.slug);
	return {
		props: { evt },
		revalidate: 1,
	};
}
