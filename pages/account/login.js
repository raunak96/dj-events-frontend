import AuthForm from "components/AuthForm";
import Layout from "components/Layout";
import { AuthContext } from "context/AuthContext";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

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
		</Layout>
	);
};

export default LoginPage;
