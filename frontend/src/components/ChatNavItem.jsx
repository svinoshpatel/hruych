import { useState } from "react";
import { useNavigate } from "react-router";
import ChatIcon from "../assets/ChatIcon";
import SignForm from "./SignForm";

export default function ChatNavItem({ isAuthorized }) {
	const navigate = useNavigate();
	const [showAuthPrompt, setShowAuthPrompt] = useState(false);

	function handleClick() {
		if (isAuthorized) {
			nagivate('/chat');
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
				<ChatIcon />
			</button>
			{showAuthPrompt && (
				<SignForm setShowAuthPrompt={setShowAuthPrompt} />
			)}
		</>
	);
};
