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
		element: <Navbar />,
		children: [
			{ path: '/', element: <App />, loader: auctionsLoader },
			{ path: '/auction/:id', element: <Auction />, loader: auctionLoader },
			{ path: '/account/me', element: <Account />, loader: accountLoader },
			{ path: '/auction/create', element: <CreateAuction /> },
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
