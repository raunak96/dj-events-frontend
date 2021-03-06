import Layout from "components/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "styles/Form.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { API_URL } from "config/";
import axios from "axios";
import moment from "moment";
import Image from "next/image";
import { FaImage } from "react-icons/fa";
import dynamic from "next/dynamic";
import ImageUpload from "components/ImageUpload";
import parseCookie from "helpers/";

const Modal = dynamic(
	async () => {
		const { default: Modal } = await import("components/Modal");
		return Modal;
	},
	{ ssr: false }
);

const EditEventPage = ({ evt, token }) => {
	const [values, setValues] = useState({
		name: evt.name,
		performers: evt.performers,
		venue: evt.venue,
		address: evt.address,
		time: evt.time,
		description: evt.description,
		date: moment(evt.date).format("yyyy-MM-DD"),
	});
	const [showModal, setShowModal] = useState(false);
	const { name, performers, venue, address, date, time, description, image } =
		values;
	const router = useRouter();

	const handleSubmit = async e => {
		e.preventDefault();
		const errors = Object.entries(values).reduce((prev, [key, value]) => {
			if (value === "")
				return [
					...prev,
					`${key[0].toUpperCase()}${key.slice(1)} cannot be empty`,
				];
			return prev;
		}, []);
		if (errors.length !== 0) {
			toast.error(() => (
				<ul style={{ padding: "1rem", listStyle: "inside" }}>
					{errors.map((error, index) => (
						<li key={index}>{error}</li>
					))}
				</ul>
			));
			return;
		}
		try {
			const { data } = await axios.put(
				`${API_URL}/events/${evt.id}`,
				values,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			router.push(`/events/${data.slug}`);
		} catch (err) {
			if (
				err.response.data.statusCode === 403 ||
				err.response.data.statusCode === 401
			)
				return toast.error("Unauthorized.");
			toast.error("Something went wrong!");
		}
	};
	const handleInputChange = e => {
		const { name, value } = e.target;
		setValues(prev => ({ ...prev, [name]: value }));
	};
	const handleImageUpload = image => {
		setValues(prev => ({ ...prev, image: image?.formats?.thumbnail?.url }));
		setShowModal(false);
	};

	return (
		<Layout title={`Edit ${evt.name} Event`}>
			<Link href="/events">Go Back</Link>
			<h1>Edit Event</h1>
			<ToastContainer />
			<form onSubmit={handleSubmit} className={styles.form}>
				<div className={styles.grid}>
					<div>
						<label htmlFor="name">Event Name</label>
						<input
							type="text"
							name="name"
							id="name"
							value={name}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor="performers">Performers</label>
						<input
							type="text"
							name="performers"
							id="performers"
							value={performers}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor="venue">Venue</label>
						<input
							type="text"
							name="venue"
							id="venue"
							value={venue}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor="address">Address</label>
						<input
							type="text"
							name="address"
							id="address"
							value={address}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor="date">Date</label>
						<input
							type="date"
							name="date"
							id="date"
							value={date}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor="time">Time</label>
						<input
							type="text"
							name="time"
							id="time"
							value={time}
							onChange={handleInputChange}
						/>
					</div>
				</div>
				<div>
					<label htmlFor="description">Event Description</label>
					<textarea
						type="text"
						name="description"
						id="description"
						value={description}
						onChange={handleInputChange}></textarea>
				</div>
				<input type="submit" value="Edit Event" className="btn" />
			</form>
			<h2>Event Image</h2>
			{image ? (
				<Image src={image} height={100} width={170} alt="Event Image" />
			) : (
				<div>
					<p>No image uploaded</p>
				</div>
			)}
			<button
				className="btn-secondary"
				style={{ display: "block" }}
				onClick={() => setShowModal(true)}>
				<FaImage /> Set Image
			</button>
			<Modal show={showModal} onClose={() => setShowModal(false)}>
				<ImageUpload
					eventId={evt.id}
					handleImageUpload={handleImageUpload}
					token={token}
				/>
			</Modal>
		</Layout>
	);
};

export default EditEventPage;

export async function getServerSideProps({ params, req }) {
	const { token } = parseCookie(req);
	if (!token) {
		return {
			redirect: { destination: "/account/login" },
		};
	}
	try {
		const { data } = await axios.get(`${API_URL}/events/me/${params.id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return {
			props: { evt: data, token },
		};
	} catch (err) {
		return {
			redirect: {
				destination: "/events",
			},
		};
	}
}
