import { useLoaderData } from 'react-router';
import './App.css';
import AuctionList from './components/AuctionList';

export async function loader() {
	const res = await fetch(`http://localhost:3000/api/auction/`);
	return res.json();
};

function App() {
	const auctions = useLoaderData();
	return(
		<AuctionList auctions={auctions}/>
	);
};

export default App;
