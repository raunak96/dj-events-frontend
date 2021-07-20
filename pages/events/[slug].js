import { useRouter } from "next/router";
import Layout from "../../components/Layout";

const EventPage = () => {
	const router = useRouter();
	return (
		<Layout
			title={`${
				router.query.slug ? `${router.query.slug} - ` : ""
			} Event`}>
			<h1>My Event</h1>
		</Layout>
	);
};

export default EventPage;
