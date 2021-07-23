import axios from "axios";
import { API_URL } from "config/";
import { useRef } from "react";
import styles from "styles/Form.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const ImageUpload = ({ eventId, handleImageUpload }) => {
	const fileRef = useRef();

	const handleSubmit = async e => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("files", fileRef.current.files[0]);
		formData.append("ref", "events");
		formData.append("refId", eventId);
		formData.append("field", "image");

		try {
			const { data } = await axios.post(`${API_URL}/upload`, formData);
			handleImageUpload(data[0]);
		} catch (err) {
			toast.error("Image upload failed");
		}
	};
	return (
		<div className={styles.form}>
			<h1>Upload Event Image</h1>
			<ToastContainer />
			<form onSubmit={handleSubmit}>
				<div className="file">
					<input ref={fileRef} type="file" />
				</div>
				<input type="submit" value="Upload" className="btn" />
			</form>
		</div>
	);
};

export default ImageUpload;
