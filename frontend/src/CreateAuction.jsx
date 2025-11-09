import { useState } from "react";
import ImageUpload from "./components/ImageUpload";
import { useNavigate } from "react-router";

export default function CreateAuction() {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [selectedFile, setSelectedFile] = useState(null);
	const [startingBid, setStartingBid] = useState(0);
	const [minBidStep, setMinBidStep] = useState(1);
	const [isAutobuy, setIsAutobuy] = useState(false);
	const [autobuyPrice, setAutobuyPrice] = useState(0);
	const [duration, setDuration] = useState('1');

	const navigate = useNavigate();

	async function handleSubmitAuction(event) {
		event.preventDefault();	

		const formData = new FormData();
		formData.append('title', title);
		formData.append('description', description);
		formData.append('image', selectedFile);
		formData.append('startingBid', startingBid);
		formData.append('minBidStep', minBidStep);
		formData.append('isAutobuy', isAutobuy);
		formData.append('autobuyPrice', autobuyPrice);
		formData.append('duration', duration);

		try {
			const response = await fetch(
				'http://localhost:3000/api/auction', {
				method: 'POST',
				credentials: 'include',
				body: formData,
			});

			if (!response.ok) {
				const err = await response.text();
				throw new Error(err || 'Failed to create auction');
			};

			navigate('/account/me');	

		} catch (err) {
			console.error(err);
		};
	};

	return(
		<>
			<form
				onSubmit={handleSubmitAuction}
				className="mx-5">
				<div
					className="
						flex justify-center items-center mt-10 bg-mocha-mantle
						min-h-50
					"
				>
					<ImageUpload
						selectedFile={selectedFile}
						setSelectedFile={setSelectedFile}
					/>
				</div>
				<div
					className="
						flex flex-col
						mt-5
					"
				>
				<h2 className="mb-1">Title</h2>
				<input
					type='text'
					value={title}
					onChange={(e) =>
						setTitle(e.target.value)}
					className="
						py-2 px-4
						bg-mocha-mantle
						rounded-lg
						focus:outline-none
					"
					required
				/>
				</div>
				<div
					className="
						flex flex-col
						mt-5
					"
				>
				<h2 className="mb-1">Description</h2>
				<textarea
					type='text'
					value={description}
					onChange={(e) =>
						setDescription(e.target.value)}
					className="
						py-2 px-4
						bg-mocha-mantle
						rounded-lg
						focus:outline-none
					"
				/>
				</div>
				<h1
					className="
						mt-5
						text-3xl font-bold
					"
				>
					Bid
				</h1>
				<div>
					<h2 className="mb-1">Starting bid amount</h2>
					<input
						type='number'
						value={startingBid}
						onChange={(e) =>
							setStartingBid(e.target.value)}
						className="
							py-2 px-4
							bg-mocha-mantle
							rounded-lg
							focus:outline-none
						"
						required
					/>
				</div>
				<div>
					<h2 className="mb-1">Min bid step</h2>
					<input
						type='number'
						value={minBidStep}
						onChange={(e) =>
							setMinBidStep(e.target.value)}
						className="
							py-2 px-4
							bg-mocha-mantle
							rounded-lg
							focus:outline-none
						"
						required
					/>
				</div>
				<div className="flex">
					<h2 className="mb-1 mr-3">Autobuy</h2>
					<input
						type='checkbox'
						checked={isAutobuy}
						onChange={(e) =>
							setIsAutobuy(e.target.checked)}
						className="
							py-2 px-4
							bg-mocha-mantle
							rounded-lg
							focus:outline-none
						"
					/>
				</div>
				{isAutobuy && (
					<div>
						<h2 className="mb-1">Autobuy price</h2>
						<input
							type='number'
							value={autobuyPrice}
							onChange={(e) =>
								setAutobuyPrice(e.target.value)}
							className="
								py-2 px-4
								bg-mocha-mantle
								rounded-lg
								focus:outline-none
							"
							required
						/>
					</div>
				)}
				<div>
					<h2 className="mb-1">Will last</h2>
					<input
						type='radio'
						id='2minutes'
						name='duration'
						value='2'
						checked={duration === '2'}
						onChange={(e) => setDuration(e.target.value)}
					/>
					<label htmlFor='2minutes' className="ml-2">
						2 minutes
					</label><br/>
					<input
						type='radio'
						id='day'
						name='duration'
						value='1'
						checked={duration === '1'}
						onChange={(e) => setDuration(e.target.value)}
					/>
					<label htmlFor='day' className="ml-2">
						24 hours
					</label><br/>
					<input
						type='radio'
						id='3days'
						name='duration'
						value='3'
						checked={duration === '3'}
						onChange={(e) => setDuration(e.target.value)}
					/>
					<label htmlFor='3days' className="ml-2">
						3 days
					</label><br/>
				</div>
					<button
						type='submit'
						className='
							my-5 py-1 px-2
							bg-mocha-blue
							rounded-full
							font-bold
							bg-linear-to-r from-mocha-blue to-mocha-sky
							text-mocha-crust text-lg
						'
					>
						Create
					</button>
			</form>
		</>
	);
};
