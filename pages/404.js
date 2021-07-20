import Link from "next/link";
import Layout from "components/Layout";
import styles from "styles/404.module.css";
import { FaExclamationTriangle } from "react-icons/fa";

const NotFoundPage = () => {
	return (
		<Layout title="Page Not Found">
			<div className={styles.error}>
				<h1>
					<FaExclamationTriangle />
					<span>404</span>
				</h1>
				<h4>Sorry, there is nothing here.</h4>
				<Link href="/">Go back to Home</Link>
			</div>
		</Layout>
	);
};

export default NotFoundPage;
