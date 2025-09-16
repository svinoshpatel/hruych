import { useLoaderData } from 'react-router';
import './App.css';
import { Masonry } from 'masonic';

export async function loader() {
	const res = await fetch(`http://localhost:3000/api/auction/`);

	if (!res.ok) {
		throw new Response('Not Found', { status: 404 });
	};
	return res.json();
};

function App() {
	const auctions = useLoaderData() || [];
	return(
		<div className='flex h-screen'>
			<Masonry
				className='m-2'
				items={auctions}
				render={MasonryCard}
				rowGutter={10}
				columnGutter={10}
			/>
		</div>
	);
};

const MasonryCard = ({ index, data, width }) => (
  <a href={`/auction/${data.id}`}>
    <img src={data.image} alt={`item-${index}`} />
    <div>Index: {index}</div>
    <pre>ID: {data.id}</pre>
    <div>Column width: {width}</div>
  </a>
);

export default App;
