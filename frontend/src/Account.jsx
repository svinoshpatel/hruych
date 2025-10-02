import { useState } from "react";
import ProfilePic from "./components/ProfilePic";
import MessageIcon from "./assets/MessageIcon";

export default function Account() {
	const [isFollowed, setIsFollowed] = useState(false);
	const [isAuctionActive, setIsAuctionActive] = useState(true);
	const [isPortfolioActive, setIsPortfolioActive] = useState(false);

	function handleFollow() {
		setIsFollowed(!isFollowed);
	};

	function handleOpenAuction() {
		if (isAuctionActive)
			return;
		setIsAuctionActive(true);
		setIsPortfolioActive(false);	
	};

	function handleOpenPortfolio() {
		if (isPortfolioActive)
			return;
		setIsPortfolioActive(true);
		setIsAuctionActive(false);	
	};

	return(
		<>
			<div className='bg-mocha-crust h-50 relative'>
				<div className="absolute top-35 left-10">
					<ProfilePic className='size-30' />
				</div>
			</div>
			<div className="flex flex-col">
				<h1 className="text-right mr-10 mt-2 text-2xl font-bold">
					Svinoshpatel
				</h1>
				<h2 className="text-right mr-10 mt-1 text-xs text-mocha-subtext0">
					Local time 3:19 PM
				</h2>
				{/* Buttons */}
				<div className="flex">
					<button
						onClick={handleFollow}
						className={
							`w-3/4
							ml-10 mr-2 mt-5 py-1
							bg-mocha-blue
							rounded-full
							 font-bold
							${isFollowed ? 'bg-mocha-mantle outline-mocha-overlay0 outline-1' :
								`bg-linear-to-r from-mocha-blue to-mocha-sky
								text-mocha-crust`
							}`
						}
					>
						{isFollowed ? 'Following' : 'Follow'}
					</button>
					<button
						className="
							mr-10 mt-5 py-1 px-2
							bg-mocha-teal
							bg-linear-to-r from-mocha-teal to-mocha-green
							rounded-full
							text-mocha-crust font-bold
						"
					>
						<MessageIcon />
					</button>
				</div>
				{/* Socials */}
				<div className="text-center mt-5">
					<a className="mx-5">
						X
					</a>
					<a className="mx-5">
						Instagram
					</a>
					<a className="mx-5">
						Tiktok
					</a>
				</div>
				{/* Bio */}
				<div className="bg-mocha-mantle mx-5 mt-5 rounded-xl">
					<p
						className="
							p-2
							text-mocha-subtext1 text-sm
						"
					>
						Character sheets | Emotes | Illustrations | Vtuber Models | 
					</p>
				</div>
				{/* Tabs */}
				<div className="h-1 mt-5 bg-mocha-mantle" />
				<div className="mt-5 mx-5 flex justify-evenly">
					<button
						onClick={handleOpenAuction}
						className={
							`font-semibold pb-2 w-1/2 pt-1 rounded-t-xl
							${isAuctionActive ? 'bg-mocha-mantle' : ''}`	
						}
					>
						Auction
					</button>
					<button
						onClick={handleOpenPortfolio}
						className={
							`font-semibold pb-2 w-1/2 pt-1 rounded-t-xl 
							${isPortfolioActive ? 'bg-mocha-mantle' : ''}`
						}
					>
						Portfolio
					</button>
				</div>
				<div
					className={
						`bg-mocha-mantle h-100 mx-5
						${isAuctionActive ? 'rounded-tr-xl' : 'rounded-tl-xl'}`
					}
				>
				</div>
			</div>
		</>
	);
};
