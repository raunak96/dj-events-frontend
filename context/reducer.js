const ACTION_TYPES = {
	SETUSER: "setuser",
	SETERROR: "setError",
};

export const { SETUSER, SETERROR } = ACTION_TYPES;

const reducer = (state, action) => {
	switch (action.type) {
		case SETUSER:
			return { ...state, currentUser: action.payload, error: null };
		case SETERROR:
			return { ...state, error: action.payload };
		default:
			return state;
	}
};

export default reducer;
