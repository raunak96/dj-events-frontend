import axios from "axios";
import { NEXT_URL } from "config/";
import { createContext, useReducer } from "react";
import reducer, { LOGIN, SETERROR } from "./reducer";

const initialState = { currentUser: null, error: null };

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { currentUser, error } = state;

	const register = user => {
		console.log(user);
	};

	const login = async ({ email: identifier, password }) => {
		try {
			const { data } = await axios.post(`${NEXT_URL}/api/login`, {
				identifier,
				password,
			});
			dispatch({ type: LOGIN, payload: data });
		} catch (err) {
			dispatch({ type: SETERROR, payload: err.response.data });
			dispatch({ type: SETERROR, payload: null });
		}
	};

	const isLoggedIn = user => {
		console.log("isLoggedIn");
	};

	const logout = () => {
		console.log("logout");
	};

	return (
		<AuthContext.Provider
			value={{ currentUser, error, register, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };
