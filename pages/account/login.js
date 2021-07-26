import AuthForm from "components/AuthForm";
import Layout from "components/Layout";
import { AuthContext } from "context/AuthContext";
import { useContext, useEffect } from "react";

const LoginPage = () => {
	const { login, error } = useContext(AuthContext);
	const handleSubmit = userData => {
		login(userData);
	};

	return (
		<Layout title="Sign In">
			<AuthForm onSubmit={handleSubmit} error={error} />
		</Layout>
	);
};

export default LoginPage;
