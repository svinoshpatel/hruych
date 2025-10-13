import { useState } from "react";
import { useNavigate } from "react-router";
import SignForm from "./SignForm";
import ProfilePic from "./ProfilePic";
import { useContext } from "react";
import { AccountContext } from "../AccountContext";

export default function ProfileNavItem({ isAuthorized }) {
	const navigate = useNavigate();
	const [showAuthPrompt, setShowAuthPrompt] = useState(false);
	const { account } = useContext(AccountContext);

	function handleClick() {
		if (isAuthorized) {
			navigate('/account/me');
		} else {
			setShowAuthPrompt(true);
		};
	};

	return(
		<>
			<button
				type="button"
				onClick={handleClick}
				className='
					inline-flex flex-col items-center justify-center
					px-5
				'
			>
				<ProfilePic
					className='
						size-8 outline-mocha-text outline-2
					'
					src={account}
				/>
			</button>
			{showAuthPrompt && (
				<SignForm setShowAuthPrompt={setShowAuthPrompt} />
			)}
		</>
	);
};

