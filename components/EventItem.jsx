import styles from "styles/EventItem.module.css";
import Image from "next/image";
import Link from "next/link";
import { forwardRef } from "react";

const EventItem = forwardRef(function EventItem({ evt }, ref) {
	return (
		<div className={styles.event} ref={ref}>
			<div className={styles.img}>
				<Image
					src={
						evt?.image?.formats?.thumbnail?.url ??
						"https://res.cloudinary.com/rawn/image/upload/v1627041391/thumbnail_event_default_5085837679.png"
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
});

export default EventItem;
