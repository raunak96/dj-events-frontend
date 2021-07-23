import { useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import styles from "styles/Modal.module.css";

const Modal = ({ show, onClose, children, title }) => {
	const ref = useRef();
	useEffect(() => {
		if (show) {
			ref.current.scrollIntoView();
		}
	}, [show]);
	return (
		show && (
			<div className={styles.overlay} onClick={onClose} ref={ref}>
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
