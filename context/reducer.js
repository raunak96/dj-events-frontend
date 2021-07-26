const ACTION_TYPES = {
	REGISTER: "registerUser",
	LOGIN: "loginUser",
	LOGOUT: "logoutUser",
	SETERROR: "setError",
	ISLOGGEDIN: "isLoggedIn",
};

export const { REGISTER, LOGIN, LOGOUT, SETERROR, ISLOGGEDIN } = ACTION_TYPES;

const reducer = (state, action) => {
	switch (action.type) {
		case REGISTER:
		case LOGIN:
		case ISLOGGEDIN:
		case LOGOUT:
			return { ...state, currentUser: action.payload, error: null };
		case SETERROR:
			return { ...state, error: action.payload };
		default:
			return state;
	}
};

export default reducer;
