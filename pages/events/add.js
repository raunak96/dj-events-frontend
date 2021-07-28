import Layout from "components/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "styles/Form.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { API_URL } from "config/";
import axios from "axios";
import { FaImage } from "react-icons/fa";
import ImagePreview from "components/ImagePreview";
import parseCookie from "helpers/";

const AddEventPage = ({ token }) => {
	const [values, setValues] = useState({
		name: "",
		performers: "",
		venue: "",
		address: "",
		date: "",
		time: "",
		description: "",
	});
	const { name, performers, venue, address, date, time, description } =
		values;

	const [image, setImage] = useState("");
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
		const formData = new FormData();
		formData.append("data", JSON.stringify(values));
		if (image) formData.append(`files.image`, image, image.name);
		try {
			const { data: evt } = await axios.post(
				`${API_URL}/events`,
				formData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			router.push(`/events/${evt.slug}`);
		} catch (err) {
			if (
				err.response.data.statusCode === 403 ||
				err.response.data.statusCode === 401
			)
				return toast.error("You are not signed In.");
			toast.error("Something went wrong!");
		}
	};
	const handleInputChange = e => {
		const { name, value } = e.target;
		setValues(prev => ({ ...prev, [name]: value }));
	};

	return (
		<Layout title="Add New Event">
			<Link href="/events">Go Back</Link>
			<h1>Add Event</h1>
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
					<div className={styles.fileInput}>
						<label htmlFor="image">
							<FaImage />
							<p>Set Image</p>
						</label>
						<input
							type="file"
							id="image"
							name="image"
							onChange={e =>
								e.target.files[0] && setImage(e.target.files[0])
							}
						/>
					</div>
					<div>
						<ImagePreview image={image} />
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
				<input type="submit" value="Add Event" className="btn" />
			</form>
		</Layout>
	);
};

export default AddEventPage;

export async function getServerSideProps({ req }) {
	const { token } = parseCookie(req);
	if (!token) {
		return {
			redirect: { destination: "/account/login" },
		};
	}
	return {
		props: { token },
	};
}
