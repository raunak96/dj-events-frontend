import useImageSrc from "hooks/useImageSrc";
import Image from "next/image";
import { useState } from "react";
import Modal from "./Modal";

const ImagePreview = ({ image }) => {
	const [showModal, setShowModal] = useState(false);
	const imageSrc = useImageSrc(image);
	if (!image) return <p style={{ textAlign: "center" }}>No Image Selected</p>;
	return (
		<>
			<button
				type="button"
				className="btn-secondary"
				onClick={e => setShowModal(true)}>
				Preview {image.name}
			</button>

			<Modal show={showModal} onClose={() => setShowModal(false)}>
				<div
					style={{
						position: "absolute",
						inset: 0,
					}}>
					<Image
						src={imageSrc}
						height={600}
						width={500}
						alt="Event Image"
					/>
				</div>
			</Modal>
		</>
	);
};

export default ImagePreview;
