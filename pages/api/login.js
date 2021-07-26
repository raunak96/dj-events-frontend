import axios from "axios";
import { API_URL } from "config/";

const handler = async (req, res) => {
	switch (req.method) {
		case "POST":
			const { identifier, password } = req.body;
			try {
				const { data } = await axios.post(`${API_URL}/auth/local`, {
					identifier,
					password,
				});
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
