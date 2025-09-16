import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App, { loader as auctionsLoader } from './App.jsx'
import Auction, { loader as auctionLoader } from './Auction.jsx'
import { RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router';

const router = createBrowserRouter([
	{ path: '/', Component: App, loader: auctionsLoader },
	{ path: '/auction/:id', Component: Auction, loader: auctionLoader },
]);

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
)
