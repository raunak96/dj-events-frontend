import cookie from "cookie";

const parseCookie = req => cookie.parse(req?.headers?.cookie ?? "");

export default parseCookie;
