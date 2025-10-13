import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App, { loader as auctionsLoader } from './App.jsx';
import Auction, { loader as auctionLoader } from './Auction.jsx';
import Navbar from './Navbar.jsx';
import Account, { loader as accountLoader } from './Account.jsx';
import { RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router';
import { AccountProvider } from './AccountContext';
import CreateAuction from './CreateAuction.jsx';

const router = createBrowserRouter([
	{
		path: '/',
		Component: Navbar,
		children: [
			{ path: '/', Component: App, loader: auctionsLoader },
			{ path: '/auction/:id', Component: Auction, loader: auctionLoader },
			{ path: '/account/me', Component: Account, loader: accountLoader },
			{ path: '/auction/create', Component: CreateAuction },
		]
	}
]);

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<AccountProvider>
			<RouterProvider router={router} />
		</AccountProvider>
	</StrictMode>,
)
