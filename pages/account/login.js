import AuthForm from "components/AuthForm";
import Layout from "components/Layout";
import { API_URL } from "config/";
import { AuthContext } from "context/AuthContext";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { FaGoogle } from "react-icons/fa";

const LoginPage = () => {
	const { login, error, currentUser = undefined } = useContext(AuthContext);
	const router = useRouter();
	const handleSubmit = userData => {
		login(userData);
	};

	useEffect(() => {
		if (currentUser) router.replace("/account/dashboard");
	}, [currentUser, router]);

	return currentUser === null ? (
		<Layout title="Sign In">
			<AuthForm onSubmit={handleSubmit} error={error} />
			<p style={{ textAlign: "center" }}>OR</p>
			<a
				className="btn-primary btn-icon"
				style={{ maxWidth: "500px", margin: "auto" }}
				onClick={() => router.push(`${API_URL}/connect/google`)}>
				<FaGoogle />
				&nbsp;Sign in with Google
			</a>
		</Layout>
	) : (
		<p style={{ textAlign: "center" }}>Already Logged In.Redirecting...</p>
	);
};

export default LoginPage;
