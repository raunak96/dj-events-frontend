import styles from "styles/EventItem.module.css";
import Image from "next/image";
import Link from "next/link";

const EventItem = ({ evt }) => {
	return (
		<div className={styles.event}>
			<div className={styles.img}>
				<Image
					src={
						evt.image.formats.thumbnail.url ??
						"/images/event-default.png"
					}
					alt={evt.name}
					height={100}
					width={170}
				/>
			</div>
			<div className={styles.info}>
				<span>
					{new Date(evt.date).toDateString("en-IN")} at {evt.time}
				</span>
				<h3>{evt.name}</h3>
			</div>
			<div className={styles.link}>
				<Link href={`/events/${evt.slug}`}>
					<a className="btn">Details</a>
				</Link>
			</div>
		</div>
	);
};

export default EventItem;
