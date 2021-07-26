import Link from "next/link";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import styles from "styles/AuthForm.module.css";

const AuthForm = ({ isLogin = true, title = "Log In", onSubmit, error }) => {
	const [formData, setFormData] = useState({
		username: isLogin ? undefined : "",
		email: "",
		password: "",
		confirmPassword: isLogin ? undefined : "",
	});
	const { username, email, password, confirmPassword } = formData;

	useEffect(() => error && toast.error(error.message), [error]);

	const handleChange = e => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};
	const handleSubmit = e => {
		e.preventDefault();
		const errors = Object.entries(formData).reduce((prev, [key, value]) => {
			if (value === "")
				return [
					...prev,
					`${key[0].toUpperCase()}${key.slice(1)} is required`,
				];
			return prev;
		}, []);
		if (!isLogin && confirmPassword !== password)
			errors.push("Passwords do not match");
		if (errors.length !== 0) {
			toast.error(() => (
				<ul style={{ padding: "1rem", listStyle: "inside" }}>
					{errors.map((error, index) => (
						<li key={index}>{error}</li>
					))}
				</ul>
			));
			return;
		}
		onSubmit(formData);
	};
	return (
		<>
			<ToastContainer />
			<div className={styles.auth}>
				<h1>
					<FaUser /> {title}
				</h1>
				<form onSubmit={handleSubmit}>
					{!isLogin && (
						<div>
							<label htmlFor="username">Username</label>
							<input
								type="text"
								name="username"
								id="username"
								value={username}
								onChange={handleChange}
							/>
						</div>
					)}
					<div>
						<label htmlFor="email">Email</label>
						<input
							type="text"
							name="email"
							id="email"
							value={email}
							onChange={handleChange}
						/>
					</div>
					<div>
						<label htmlFor="password">Password</label>
						<input
							type="password"
							name="password"
							id="password"
							value={password}
							onChange={handleChange}
						/>
					</div>
					{!isLogin && (
						<div>
							<label htmlFor="confirmPassword">
								Confirm Password
							</label>
							<input
								type="password"
								name="confirmPassword"
								id="confirmPassword"
								value={confirmPassword}
								onChange={handleChange}
							/>
						</div>
					)}
					<input
						type="submit"
						value={isLogin ? "Sign In" : "Sign Up"}
						className="btn"
					/>
				</form>
				<p>
					{isLogin ? (
						<>
							Don&lsquo;t have an account?
							<Link href="/account/register">Register here.</Link>
						</>
					) : (
						<>
							Already have an account?
							<Link href="/account/login"> Sign In here.</Link>
						</>
					)}
				</p>
			</div>
		</>
	);
};

export default AuthForm;
