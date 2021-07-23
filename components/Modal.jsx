import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import styles from "styles/Modal.module.css";

const Modal = ({ show, onClose, children, title }) => {
	useEffect(() => {
		if (show) {
			document.body.style = "overflow:hidden";
			document.body.scrollIntoView();
		} else {
			document.body.style = "overflow:auto";
		}
	}, [show]);
	return (
		show && (
			<div className={styles.overlay} onClick={onClose}>
				<div
					className={styles.modal}
					onClick={e => e.stopPropagation()}>
					<div className={styles.header}>
						<a href="#" onClick={onClose}>
							<FaTimes />
						</a>
					</div>
					{title && <div>{title}</div>}
					<div className={styles.body}>{children}</div>
				</div>
			</div>
		)
	);
};

export default Modal;
