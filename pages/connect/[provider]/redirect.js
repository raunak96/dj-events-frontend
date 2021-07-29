import axios from "axios";
import { API_URL } from "config/";
import { AuthContext } from "context/AuthContext";
import { useContext, useEffect } from "react";
import cookie from "cookie";

const Redirect = ({ user }) => {
	const { setUser } = useContext(AuthContext);

	useEffect(() => {
		if (user) {
			setUser(user);
		}
	}, [setUser, user]);

	return (
		<div>
			<p style={{ marginLeft: "25px" }}>
				You have been successfully logged in. You will be redirected in
				a few seconds...
			</p>
		</div>
	);
};

export default Redirect;

export async function getServerSideProps({ params, query, res }) {
	const { access_token } = query;
	const { provider } = params;

	try {
		const { data } = await axios.get(
			`${API_URL}/auth/${provider}/callback?access_token=${access_token}`
		);
		res.setHeader(
			"Set-Cookie",
			cookie.serialize("token", data.jwt, {
				httpOnly: true,
				secure: process.env.NODE_ENV !== "development",
				maxAge: 60 * 60 * 24 * 7, // 1 week
				sameSite: "strict",
				path: "/",
			})
		);
		return {
			props: { user: data.user },
		};
	} catch (err) {
		return {
			props: { user: null },
		};
	}
}
