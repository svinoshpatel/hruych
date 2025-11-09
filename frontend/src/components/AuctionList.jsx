import { useState, useEffect } from 'react';
import { Masonry } from 'masonic';

function AuctionList({ auctions }) {
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		requestAnimationFrame(() => {
			setTimeout(() => setIsReady(true), 0);
		});
	}, []);

	if (!isReady) {
		return <div className='text-transparent'>...</div>;
	};

	if (!auctions || auctions.length === 0) {
		return(
			<div className='p-4 text-center text-mocha-subtext0'>
				Nothing to display
			</div>
		);
	};

	return(
		<div className='flex'>
			<Masonry
				className='m-2'
				items={auctions}
				render={MasonryCard}
				rowGutter={10}
				columnGutter={10}
				columnWidth={150}
				itemKey={data => data.id}
			/>
		</div>
	);
};

function MasonryCard({ data }) {
	return(
		<a href={`/auction/${data.id}`}>
			<img
				src={data.image}
				alt={`${data.title || 'Auction item'}`}
				className='rounded-2xl'
			/>
			<span
				className='
				absolute bottom-1 right-2
				bg-mocha-mauve text-mocha-base text-sm
				rounded-4xl px-2'
			>
				{data.end_time}
			</span>
		</a>
	);
};

export default AuctionList;
