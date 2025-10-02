import { useState, useEffect } from 'react';
import { Masonry } from 'masonic';

function AuctionList({ auctions }) {
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		requestAnimationFrame(() => {
			setTimeout(() => setIsReady(true), 0);
		});
	}, []);

	return isReady ? (
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
	) : <div className='text-transparent'>...</div>;
};

const MasonryCard = ({ data }) => (
	<a href={`/auction/${data.id}`}>
		<img
			src={data.image}
			alt={`${data.title || 'Auction item'}`}
			className='rounded-2xl'
		/>
		<span
			className='
			absolute bottom-1 left-2
			bg-mocha-green text-mocha-base text-sm
			rounded-4xl px-2'
		>
			300$
		</span>
		<span
			className='
			absolute bottom-1 right-2
			bg-mocha-mauve text-mocha-base text-sm
			rounded-4xl px-2'
		>
			{data.end_time}
		</span>
		<span
			className='
			absolute top-1 right-2
			bg-mocha-yellow text-mocha-base text-sm
			rounded-4xl px-2'
		>
			Promoted
		</span>
	</a>
);

export default AuctionList;
