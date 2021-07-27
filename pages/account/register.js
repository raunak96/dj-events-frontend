import AuthForm from "components/AuthForm";
import Layout from "components/Layout";
import { AuthContext } from "context/AuthContext";
import { useContext } from "react";

const RegisterPage = () => {
	const { register, error } = useContext(AuthContext);
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
		</Layout>
	);
};

export default RegisterPage;
