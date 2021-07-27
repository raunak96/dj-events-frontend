import cookie from "cookie";

const handler = async (req, res) => {
	switch (req.method) {
		case "POST":
			res.setHeader(
				"Set-Cookie",
				cookie.serialize("token", "", {
					httpOnly: true,
					secure: process.env.NODE_ENV !== "development",
					expires: new Date(0),
					sameSite: "strict",
					path: "/",
				})
			);
			res.status(200).json({ message: "Success" });
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
