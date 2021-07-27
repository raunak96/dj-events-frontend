import Layout from "components/Layout";
import { AuthContext } from "context/AuthContext";
import { useContext } from "react";

const DashboardPage = () => {
	const { currentUser } = useContext(AuthContext);
	return (
		<Layout
			title={`${
				currentUser
					? `${currentUser.username} | Dashboard`
					: "Dashboard"
			} `}>
			<h1>Dashboard</h1>
		</Layout>
	);
};

export default DashboardPage;
