import AuthForm from "components/AuthForm";
import Layout from "components/Layout";
import { API_URL } from "config/";
import { AuthContext } from "context/AuthContext";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { FaGoogle } from "react-icons/fa";

const LoginPage = () => {
	const { login, error, currentUser } = useContext(AuthContext);
	const router = useRouter();
	const handleSubmit = userData => {
		login(userData);
	};

	// useEffect(() => {
	// 	if (currentUser) router.push("/");
	// }, [currentUser, router]);

	return (
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
	);
};

export default LoginPage;
