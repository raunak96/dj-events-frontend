import AuthForm from "components/AuthForm";
import Layout from "components/Layout";
import { API_URL } from "config/";
import { AuthContext } from "context/AuthContext";
import { useRouter } from "next/router";
import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";

const RegisterPage = () => {
	const { register, error } = useContext(AuthContext);
	const router = useRouter();
	const handleSubmit = ({ confirmPassword, ...userData }) => {
		register(userData);
	};
	return (
		<Layout title="User Registration">
			<AuthForm
				title="Sign Up"
				isLogin={false}
				onSubmit={handleSubmit}
				error={error}
			/>
			<p style={{ textAlign: "center" }}>OR</p>
			<a
				className="btn-primary btn-icon"
				style={{ maxWidth: "500px", margin: "auto" }}
				onClick={() => router.push(`${API_URL}/connect/google`)}>
				<FaGoogle />
				&nbsp;Use your Google Account
			</a>
		</Layout>
	);
};

export default RegisterPage;
