import { useState } from 'react';
import CloseIcon from '../assets/CloseIcon';

export default function SignForm({ setShowAuthPrompt }) {
	const [showSignIn, setShowSignIn] = useState(false);

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
					<div>
						<h1 className="ml-5 mt-3 font-bold text-2xl">
							Log in with email
						</h1>
						<div className="flex flex-col justify-center">
							<input
								placeholder="Username or email"
								className="
									mx-5 mt-5 py-2 px-4
									bg-mocha-mantle
									rounded-lg
									focus:outline-none
								"
							/>
							<input
								placeholder="Password"
								className="
									mx-5 mt-2 py-2 px-4
									bg-mocha-mantle
									rounded-lg
									focus:outline-none
								"
							/>
							<span className='
								text-right mr-5 text-sm mt-1 text-mocha-subtext0
								'
							>
								Forgot password?
							</span>
							<button
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
									onClick={() => setShowSignIn(false)}
									className="ml-3 font-bold"
								>
									Sign up
								</button>
							</div>
						</div>
					</div>
				)
				: (
					<div>
						<h1 className="ml-5 mt-3 font-bold text-2xl">
							Create account
						</h1>
						<div className="flex flex-col justify-center">
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
									placeholder="Diplay name"
									className="
										py-2 px-4
										bg-mocha-mantle
										rounded-lg
										focus:outline-none
									"
								/>
							</div>
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
									placeholder="@username"
									className="
										py-2 px-4
										bg-mocha-mantle
										rounded-lg
										focus:outline-none
									"
								/>
							</div>
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
									placeholder="your@email.com"
									className="
										py-2 px-4
										bg-mocha-mantle
										rounded-lg
										focus:outline-none
									"
								/>
							</div>
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
									placeholder="Password"
									className="
										py-2 px-4
										bg-mocha-mantle
										rounded-lg
										focus:outline-none
									"
								/>
							</div>
							<div className='flex flex-col mx-5 mt-2'>
								<input
									placeholder="Confirm password"
									className="
										py-2 px-4
										bg-mocha-mantle
										rounded-lg
										focus:outline-none
									"
								/>
							</div>
							<button
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
									onClick={() => setShowSignIn(true)}
									className="ml-3 font-bold"
								>
									Sign in
								</button>
							</div>
						</div>
					</div>
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
