import Link from "next/link";
import styles from "../styles/Footer.module.css";

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<p>Copyright &copy; Raunak DJ Events 2k21</p>
			<p>
				<Link href="/about">About This Project</Link>
			</p>
		</footer>
	);
};

export default Footer;
