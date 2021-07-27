import axios from "axios";
import { API_URL } from "config/";
import cookie from "cookie";

const handler = async (req, res) => {
	switch (req.method) {
		case "POST":
			const { username, email, password } = req.body;
			try {
				const { data } = await axios.post(
					`${API_URL}/auth/local/register`,
					{
						email,
						password,
						username,
					}
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
				res.status(201).json({ user: data.user });
			} catch (err) {
				res.status(err.response.data.statusCode || 400).json({
					message: err.response.data.message[0].messages[0].message,
				});
			}
			break;
		default:
			res.setHeader("Allow", ["POST"]);
			res.status(405).json({
				message: `Method ${req.method} not allowed`,
			});
			break;
	}
};

export default handler;
