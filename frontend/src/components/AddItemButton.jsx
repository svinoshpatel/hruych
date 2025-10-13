import { useNavigate } from "react-router";

export default function AddItemButton() {
	const navigate = useNavigate();

	function handleAddItem() {
		navigate('/auction/create');	
	};
	return(
		<button
			type="button"
			onClick={handleAddItem}
			className="
				fixed bottom-16 right-7
				bg-mocha-blue
				bg-linear-to-r from-mocha-blue to-mocha-sky
				text-mocha-crust text-4xl font-bold
				rounded-full
				size-15
				px-3
				py-1
			"
		>
			+
		</button>
	);
};
