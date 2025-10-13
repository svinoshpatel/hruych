import { useContext, useState } from 'react';
import CloseIcon from '../assets/CloseIcon';
import { AccountContext } from '../AccountContext';

export default function SignForm({ setShowAuthPrompt }) {
	const [showSignIn, setShowSignIn] = useState(true);
	const [displayName, setDisplayName] = useState('');
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [usernameOrEmail, setUsernameOrEmail] = useState('');
	const [loginPassword, setLoginPassword] = useState('');
	const { setAccount } = useContext(AccountContext);
	const { setAuthorized } = useContext(AccountContext);

	async function handleRegisterSubmit(event) {
		event.preventDefault();

		if (password !== confirmPassword) {
			alert('Passwords don\'t match');
			return;
		};

		const payload = {
			displayName,
			username,
			email,
			password
		};

		try {
			const response = await fetch(
				'http://localhost:3000/api/auth/signup', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
			});

			if (!response.ok) {
				const error = await response.text();
				throw new Error(error || 'Failed to register');
			};

			setShowAuthPrompt(false);
		} catch (error) {
			console.error(error);
			alert('Registration failed ' + error.message);
		};
	};

	async function handleLoginSubmit(event) {
		event.preventDefault();

		const payload = {
			usernameOrEmail,
			loginPassword
		};

		try {
			const response = await fetch(
				'http://localhost:3000/api/auth/signin', {
				method: 'POST',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
			});

			if (!response.ok) {
				const error = await response.text();
				throw new Error(error || 'Failed to login');
			};

			setShowAuthPrompt(false);
			const { image } = await response.json();
			setAccount(image);
			setAuthorized(true);
		} catch (error) {
			console.error(error);
			alert('Login failed ' + error.message);
		};
	};

	return(
		<>
			<div className="
					w-[95%] bg-mocha-base fixed
					top-1/2 left-1/2
					z-2
					-translate-x-1/2 -translate-y-1/2
					rounded-4xl
				"
			>
				<div className='flex'>
					<button
						onClick={() => setShowAuthPrompt(false)}
						className="
							ml-auto mt-5 mr-6 text-2xl
						"
					>
						<CloseIcon />
					</button>
				</div>
				{showSignIn ? (
					<form>
						<h1 className="ml-5 mt-3 font-bold text-2xl">
							Log in with email
						</h1>
						<div className="flex flex-col justify-center">
							<input
								type='text'
								placeholder="@username or email"
								value={usernameOrEmail}
								onChange={(e) =>
									setUsernameOrEmail(e.target.value)}
								className="
									mx-5 mt-5 py-2 px-4
									bg-mocha-mantle
									rounded-lg
									focus:outline-none
								"
								required
							/>
							<input
								type='password'
								placeholder="Password"
								value={loginPassword}
								onChange={(e) =>
									setLoginPassword(e.target.value)}
								className="
									mx-5 mt-2 py-2 px-4
									bg-mocha-mantle
									rounded-lg
									focus:outline-none
								"
								required
							/>
							<button
								type='button'
								className='
									text-right mr-5 text-sm
									mt-1 text-mocha-subtext0
								'
							>
								Forgot password?
							</button>
							<button
								type='submit'
								onClick={handleLoginSubmit}
								className='
									mt-5 mx-10 py-1
									bg-mocha-blue
									rounded-full
									font-bold
									bg-linear-to-r from-mocha-blue to-mocha-sky
									text-mocha-crust text-lg
								'
							>
								Log in
							</button>
							<div className="flex justify-center mb-5 mt-7">
								<span className="text-mocha-subtext1">
									Don't have an account yet?
								</span>
								<button
									type='button'
									onClick={() => setShowSignIn(false)}
									className="ml-3 font-bold"
								>
									Sign up
								</button>
							</div>
						</div>
					</form>
				)
				: (
					<form onSubmit={handleRegisterSubmit}>
						<h1 className="ml-5 mt-3 font-bold text-2xl">
							Create account
						</h1>

						<div className="flex flex-col justify-center">
							{/* Display Name */}
							<div className='flex flex-col mx-5 mt-5'>
								<h2
									className='
										mb-1 ml-1 text-sm
										text-mocha-subtext0
									'
								>
									Display name
								</h2>
								<input
									type='text'
									placeholder="Diplay name"
									value={displayName}
									onChange={(e) =>
										setDisplayName(e.target.value)}
									className="
										py-2 px-4
										bg-mocha-mantle
										rounded-lg
										focus:outline-none
									"
									required
								/>
							</div>

							{/* Username */}
							<div className='flex flex-col mx-5 mt-2'>
								<h2
									className='
										mb-1 ml-1 text-sm
										text-mocha-subtext0
									'
								>
									Username
								</h2>
								<input
									type='text'
									placeholder="@username"
									value={username}
									onChange={(e) =>
										setUsername(e.target.value)}
									className="
										py-2 px-4
										bg-mocha-mantle
										rounded-lg
										focus:outline-none
									"
									required
								/>
							</div>

							{/* Email */}
							<div className='flex flex-col mx-5 mt-5'>
								<h2
									className='
										mb-1 ml-1 text-sm
										text-mocha-subtext0
									'
								>
									Email
								</h2>
								<input
									type='email'
									placeholder="your@email.com"
									value={email}
									onChange={(e) =>
										setEmail(e.target.value)}
									className="
										py-2 px-4
										bg-mocha-mantle
										rounded-lg
										focus:outline-none
									"
									required
								/>
							</div>

							{/* Password */}
							<div className='flex flex-col mx-5 mt-5'>
								<h2
									className='
										mb-1 ml-1 text-sm
										text-mocha-subtext0
									'
								>
									Password
								</h2>
								<input
									type='password'
									placeholder="Password"
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)}
									className="
										py-2 px-4
										bg-mocha-mantle
										rounded-lg
										focus:outline-none
									"
									required
								/>
							</div>

							{/* Confirm Password */}
							<div className='flex flex-col mx-5 mt-2'>
								<input
									type='password'
									placeholder="Confirm password"
									value={confirmPassword}
									onChange={(e) =>
										setConfirmPassword(e.target.value)}
									className="
										py-2 px-4
										bg-mocha-mantle
										rounded-lg
										focus:outline-none
									"
									required
								/>
							</div>

							<button
								type='submit'
								className='
									mt-5 mx-10 py-1
									bg-mocha-blue
									rounded-full
									font-bold
									bg-linear-to-r from-mocha-blue to-mocha-sky
									text-mocha-crust text-lg
								'
							>
								Create Account
							</button>

							<div className="flex justify-center mb-5 mt-7">
								<span className="text-mocha-subtext1">
									Already have an account?
								</span>
								<button
									type='button'
									onClick={() => setShowSignIn(true)}
									className="ml-3 font-bold"
								>
									Sign in
								</button>
							</div>
						</div>
					</form>
				)}
			</div>

			<div className="
				top-0 h-screen w-screen 
				z-1 fixed bg-mocha-overlay0 opacity-80
				"
			/>
		</>
	);
};
