import { useState } from 'react';
import CloseIcon from '../assets/CloseIcon';

export default function MakeBid({ setShowMakeBid, accountId, auctionId }) {
	const [price, setPrice] = useState('');
	const [
		showConfirmationPrompt,
		setShowConfirmationPrompt
	] = useState(false);

	async function handleBidSubmit(event) {
		event.preventDefault();

		const payload = {
			auctionId,
			accountId,
			price
		};

		try {
			const response = await fetch(
				`http://localhost:3000/api/auction/${auctionId}/bid`, {
				method: 'POST',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
			});

			if (!response.ok) {
				const error = await response.text();
				throw new Error(error || 'Failed to make a bid');
			};

			setShowMakeBid(false);
			window.location.reload();
		} catch (error) {
			console.error(error);
			alert('Bidding failed ' + error.message);
		};
	};

	function handleClick() {
		if (!showConfirmationPrompt)
			setShowConfirmationPrompt(true);
	};

	function handleGoBack() {
		setShowConfirmationPrompt(false);
	};

	return(
		<>
			<div className="
					w-[95%] bg-mocha-base fixed
					bottom-13 left-1/2
					z-2
					-translate-x-1/2
					rounded-t-4xl
				"
			>
				<div className='flex'>
					<button
						onClick={() => setShowMakeBid(false)}
						className="
							ml-auto mt-5 mr-6 text-2xl
						"
					>
						<CloseIcon />
					</button>
				</div>
				<form className='flex flex-col justify-center mx-5'>
					{!showConfirmationPrompt ?
						(
							<>
								<input
									type='number'
									value={price}
									onChange={(e) => setPrice(e.target.value)}
									className="
										text-center
										mt-10
										py-2 px-4
										bg-mocha-mantle
										rounded-lg
										focus:outline-none
									"
									required
								/>
								<button
									type='button'
									className='
										mt-5 mb-2 py-1
										bg-mocha-blue
										rounded-full
										font-bold
										text-lg
										bg-linear-to-r from-mocha-blue
										to-mocha-sky
										text-mocha-crust
									'
									onClick={handleClick}
								> 
											
									Bid
								</button>
							</>
						) :
						<div>
							<h1 className='font-bold text-xl'>
								Confirm your bid
							</h1>
							<p className='text-sm'>
								Please confirm that the amount you input
								is the amount you wish to bid on this auction.
								Once a bid has been confirmed it is final,
								you cannot retract it and you are required
								to buy the resulting commission.
							</p>
						</div>
					}
					{showConfirmationPrompt &&
						<>
							<button
								type='submit'
								onClick={handleBidSubmit}
								className='
									mt-5 mb-2 py-1
									bg-mocha-blue
									rounded-full
									font-bold
									text-lg
									bg-linear-to-r from-mocha-blue
									to-mocha-sky
									text-mocha-crust
								'
							> 
								Bid {price}$
							</button>
							<button
								type='button'
								className='
									mb-10 py-2
									bg-mocha-mantle
									rounded-full
									text-mocha-text
								'
								onClick={handleGoBack}
							>
								Go back
							</button>
						</>
					}
				</form>
			</div>

			<div className="
				top-0 h-screen w-screen 
				z-1 fixed bg-mocha-overlay0 opacity-80
				"
			/>
		</>
	);
};

