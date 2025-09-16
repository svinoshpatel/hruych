import { useLoaderData } from 'react-router';
import Account from './Account';

export async function loader({ params }) {
	const id = params.id;
	const res = await fetch(`http://localhost:3000/api/auction/${id}`);

	if (!res.ok) {
		throw new Response('Not Found', { status: 404 });
	};
	return res.json();
};


export default function Auction() {
	const auction = useLoaderData();

	return(
		<div className='flex flex-col m-3'>
			<img src={auction.image}/>
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
			<Account />
			

			{/* Description */}
			<div className='mt-5'>
				<h1>{auction.title}</h1>
				<p>{auction.description}</p>
			</div>
		</div>
	);
};
