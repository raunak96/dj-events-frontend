import axios from "axios";
import { API_URL } from "config/";
import cookie from "cookie";

const handler = async (req, res) => {
	switch (req.method) {
		case "GET":
			if (!req.headers.cookie)
				return res.status(403).json({ message: "Not Authorised" });
			const { token } = cookie.parse(req.headers.cookie);
			try {
				const { data: user } = await axios.get(`${API_URL}/users/me`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				res.status(200).json(user);
			} catch (err) {
				console.log(err);
				res.status(403).json({ message: "User forbidden" });
			}
			break;
		default:
			res.setHeader("Allow", ["GET"]);
			res.status(405).json({
				message: `Method ${req.method} not allowed`,
			});
			break;
	}
};

export default handler;
