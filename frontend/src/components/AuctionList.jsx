import { useState, useEffect } from 'react';
import { Masonry } from 'masonic';

function AuctionList({ auctions }) {
	const [isReady, setIsReady] = useState(false);
	const [loaded, setLoaded] = useState(false);
	const [sizes, setSizes] = useState({});
	console.log(auctions);
	console.log(loaded);
	console.log(sizes);

	useEffect(() => {
		requestAnimationFrame(() => {
			setTimeout(() => setIsReady(true), 0);
		});
	}, []);

	useEffect(() => {
		async function preload() {
			const sizeMap = {};
			await Promise.all(
				auctions.map(({ id, image }) => new Promise(resolve => {
					const img = new Image();
					img.src = image;
					img.onload = () => {
						sizeMap[id] = {
							width: img.naturalWidth,
							height: img.naturalHeight
						};
						resolve();
					};
					img.onerror = () => resolve();
				}))
			);
			setSizes(sizeMap);
			setLoaded(true);
		};
		if (auctions.length)
			preload();
	}, [auctions]);

	if (!loaded)
		return <div>Loading images...</div>;

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
				rowGutter={10}
				columnGutter={10}
				columnWidth={150}
				itemKey={data => data.id}
				render={({ data }) => (
					<MasonryCard
						data={data}
						size={sizes[data.id]}
					/>
				)}
			/>
		</div>
	);
};

function MasonryCard({ data, size }) {
	const { width, height } = size || {};
	const aspectRatio = width && height ? height / width : 1;

	return(
		<a 
			href={`/auction/${data.id}`}
			style={{ width: 150, height: 150 * aspectRatio }}
		>
			<img
				src={data.image}
				alt={`${data.title || 'Auction item'}`}
				className='rounded-2xl'
				loading='lazy'
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
