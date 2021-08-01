import Head from "next/head";
import { useRouter } from "next/router";
import styles from "styles/Layout.module.css";
import Banner from "./Banner";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ title, keywords, description, children }) => {
	const router = useRouter();
	return (
		<div className={styles.layout}>
			<Head>
				<title>{title}</title>
				<meta name="description" content={description} />
				<meta name="keywords" content={keywords.join(", ")} />
			</Head>
			<Header />
			{router.pathname === "/" && <Banner />}
			<div className={styles.container}>{children}</div>
			<Footer />
		</div>
	);
};

Layout.defaultProps = {
	title: "DJ Events | Find the hottest parties",
	description: "Find the latest DJ and other musical events",
	keywords: [
		"dj",
		"music",
		"events",
		"nextjs",
		"react",
		"edm",
		"cloudinary",
		"jwt",
	],
};
export default Layout;
