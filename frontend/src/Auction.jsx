import { useLoaderData } from 'react-router';

export async function loader({ params }) {
	const auctionId = params.id;
	const auctionRes = await fetch(
		`http://localhost:3000/api/auction/${auctionId}`
	);

	if (!auctionRes.ok) {
		throw new Response('Not Found', { status: 404 });
	};
	const auction = await auctionRes.json();
	
	const accountId = params.id;
	const accountRes = await fetch(`http://localhost:3000/api/account/${accountId}`);

	if (!accountRes.ok) {
		throw new Response('Not found', { status: 404 });
	};
	const account = await accountRes.json();

	return { account, auction };
};


export default function Auction() {
	const { auction } = useLoaderData();
	const { account } = useLoaderData();

	return(
		<div className='flex flex-col m-3'>
			<img src={auction.image} alt='Auction image' />
			<button className='bg-blue-500 text-white mt-3 h-10'>
				Bid
			</button>

			<div className='outline outline-black mt-3'>
				{/* Timer */}
				<div className='text-center'>
					08:25:15
				</div>
				{/* Bids */}
				<div className='h-50 border-t'>
					<div>bid 1</div>
					<div>bid 2</div>
					<div>bid 3</div>
				</div>
			</div>
			
			{/* Author profile */}
			<div className='flex mt-3'>
				<img
					src={account.image}
					className="size-15 rounded-full"
					alt='Account Image'
				/>
				<h2 className='ml-3'>{account.name}</h2>
			</div>

			{/* Description */}
			<div className='mt-5'>
				<h1>{auction.title}</h1>
				<p>{auction.description}</p>
			</div>
		</div>
	);
};
