import ProfilePic from "./ProfilePic";

export default function BidContainer({ bids, auction }) {
	return(
		<div>
			<div
				className='
					min-h-30 border-t border-mocha-overlay0
					border-b relative
				'
			>
				{
					bids.length === 0 ? (
						<p className='
								absolute text-mocha-subtext1 bottom-3
								left-[50%] translate-x-[-50%]
							'
						>
							No bids yet
						</p>
					) : (
						bids.map((bid, idx) => (
							<button
								className='flex my-3 w-full items-center'
								onClick={() => navigate(`/account/${bid.id}`)}
								key={idx}
							>
								<ProfilePic
									src={bid.image}
									className='size-13 rounded-full'
									alt='Account image'
								/>
								<div className='ml-3'>
									<h2 className=''>{bid.display_name}</h2>
									<h2 className='text-mocha-subtext0 text-sm'>
										@{bid.username}
									</h2>
								</div>
								<span className='ml-auto mr-5'>
									{bid.price}$
								</span>
							</button>
						))	
					)
				}
			</div>
			<div
				className='
					text-mocha-subtext1 text-center py-2
				'
			>
				Started at {auction.starting_bid}$
			</div>
		</div>
	);
};
