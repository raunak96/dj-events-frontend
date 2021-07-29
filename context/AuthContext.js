import axios from "axios";
import { NEXT_URL } from "config/";
import { useRouter } from "next/router";
import { createContext, useCallback, useEffect, useReducer } from "react";
import reducer, { SETUSER, SETERROR } from "./reducer";

const initialState = { currentUser: null, error: null };

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { currentUser, error } = state;
	const router = useRouter();

	useEffect(() => isLoggedIn(), []);

	const register = async user => {
		try {
			const { data } = await axios.post(`${NEXT_URL}/api/register`, user);
			dispatch({ type: SETUSER, payload: data });
			router.push("/account/dashboard");
		} catch (err) {
			dispatch({ type: SETERROR, payload: err.response.data });
			dispatch({ type: SETERROR, payload: null });
		}
	};

	const login = async ({ email: identifier, password }) => {
		try {
			const { data } = await axios.post(`${NEXT_URL}/api/login`, {
				identifier,
				password,
			});
			dispatch({ type: SETUSER, payload: data });
			router.push("/account/dashboard");
		} catch (err) {
			dispatch({ type: SETERROR, payload: err.response.data });
			dispatch({ type: SETERROR, payload: null });
		}
	};

	const isLoggedIn = async () => {
		try {
			const { data: user } = await axios.get(`${NEXT_URL}/api/user`);
			dispatch({ type: SETUSER, payload: { user } });
		} catch (err) {
			dispatch({ type: SETUSER, payload: null });
		}
	};

	const logout = async () => {
		try {
			await axios.post(`${NEXT_URL}/api/logout`);
			dispatch({ type: SETUSER, payload: null });
			router.push("/");
		} catch (err) {
			dispatch({
				type: SETERROR,
				payload: "Could not log out due to some error",
			});
			dispatch({ type: SETERROR, payload: null });
		}
	};

	const setUser = useCallback(
		user => {
			dispatch({ type: SETUSER, payload: user });
			router.push("/account/dashboard");
		},
		[router]
	);

	return (
		<AuthContext.Provider
			value={{ currentUser, error, register, login, logout, setUser }}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };
