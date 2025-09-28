import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App, { loader as auctionsLoader } from './App.jsx'
import Auction, { loader as auctionLoader } from './Auction.jsx'
import Navbar from './Navbar.jsx'
import Account from './Account.jsx'
import { RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router';

const router = createBrowserRouter([
	{
		path: '/',
		Component: Navbar,
		children: [
			{ path: '/', Component: App, loader: auctionsLoader },
			{ path: '/auction/:id', Component: Auction, loader: auctionLoader },
			{ path: '/account/6', Component: Account }
		]
	}
]);

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
)
