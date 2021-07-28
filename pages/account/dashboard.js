import axios from "axios";
import DashboardEvent from "components/DashboardEvent";
import Layout from "components/Layout";
import { API_URL } from "config/";
import { AuthContext } from "context/AuthContext";
import parseCookie from "helpers/";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import styles from "styles/Dashboard.module.css";

const DashboardPage = ({ events, token }) => {
	const { currentUser } = useContext(AuthContext);
	const router = useRouter();

	const deleteEvent = async id => {
		if (confirm("Are you sure you want to delete?")) {
			try {
				await axios.delete(`${API_URL}/events/${id}`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				router.reload("/dashboard");
			} catch (err) {
				if (
					err.response.data.statusCode === 403 ||
					err.response.data.statusCode === 401
				)
					return toast.error("Unauthorized.");
				toast.error(err.response.data);
			}
		}
	};

	return (
		<Layout
			title={`${
				currentUser
					? `${currentUser.username} | Dashboard`
					: "Dashboard"
			} `}>
			<div className={styles.dashboard}>
				<h1>Dashboard</h1>
				<h3>My Events</h3>
				{events.length > 0 ? (
					events.map(event => (
						<DashboardEvent
							key={event.id}
							event={event}
							handleDelete={deleteEvent}
						/>
					))
				) : (
					<h4 className={styles.empty}>
						You have not added any events.
						<p>
							<Link href="/events/add">Add Event</Link>
						</p>
					</h4>
				)}
			</div>
		</Layout>
	);
};

export default DashboardPage;

export async function getServerSideProps({ req }) {
	const { token } = parseCookie(req);
	if (!token) {
		return {
			redirect: { destination: "/account/login" },
		};
	}
	try {
		const { data: events } = await axios.get(`${API_URL}/events/me`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return {
			props: { events, token },
		};
	} catch (err) {
		if (
			err.response.data.statusCode === 401 ||
			err.response.data.statusCode === 403
		)
			return {
				redirect: { destination: "/" },
			};
		return {
			props: { events: [] },
		};
	}
}
