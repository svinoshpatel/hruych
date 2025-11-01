import { useLoaderData, useNavigate } from 'react-router';
import ProfilePic from './components/ProfilePic';
import { useState } from 'react';
import { useEffect } from 'react';
import Timer from './components/Timer';

export async function loader({ params }) {
	const auctionId = params.id;
	const auctionRes = await fetch(
		`http://localhost:3000/api/auction/${auctionId}`
	);

	if (!auctionRes.ok) {
		throw new Response('Not Found', { status: 404 });
	};
	const auction = await auctionRes.json();
	
	const accountId = auction.author_id;
	const accountRes = await fetch(
		`http://localhost:3000/api/account/${accountId}`
	);

	if (!accountRes.ok) {
		throw new Response('Not found', { status: 404 });
	};
	const account = await accountRes.json();

	return { account, auction };
};

export default function Auction() {
	const { auction } = useLoaderData();
	const { account } = useLoaderData();

	const navigate = useNavigate();

	return(
		<div className='flex flex-col m-3'>
			<img
				src={auction.image}
				alt='Auction image'
				className='rounded-2xl'
			/>

			<div className='bg-mocha-mantle mt-3 border-xl'>
				{/* Timer */}
				<Timer remainingSeconds={auction.remaining_seconds} />
				{/* Bids */}
				<div className='h-50 border-t border-mocha-overlay0'>
					<div>bid 1</div>
					<div>bid 2</div>
					<div>bid 3</div>
				</div>
			</div>

			<button
				className='
					mt-5 mb-10 py-1
					bg-mocha-blue
					rounded-full
					font-bold
					bg-linear-to-r from-mocha-blue to-mocha-sky
					text-mocha-crust
				'
			> 
						
				Bid
			</button>
			
			{/* Author profile */}
			<button
				className='flex mt-3'
				onClick={() => navigate(`/account/${account.id}`)}
			>
				<ProfilePic
					src={account.image}
					className='size-15 rounded-full'
					alt='Account image'
				/>
				<div className='ml-3'>
					<h2 className=''>{account.display_name}</h2>
					<h2 className='text-mocha-subtext0 text-sm'>
						@{account.username}
					</h2>
				</div>
			</button>

			{/* Description */}
			<div className='mt-5'>
				<h1 className='text-2xl font-semibold'>{auction.title}</h1>
				<p>{auction.description}</p>
			</div>
		</div>
	);
};
