import { Outlet } from "react-router";
import { NavLink } from "react-router";
import HomeIcon from './assets/HomeIcon';
import NotificationsIcon from "./assets/NotificationsIcon";
import ChatNavItem from "./components/ChatNavItem";
import ProfileNavItem from "./components/ProfileNavItem";
import { useContext } from "react";
import { AccountContext } from "./AccountContext";
import { useEffect } from "react";

export default function Navbar() {
	const {
		authorized, setAuthorized, setAccountPic
	} = useContext(AccountContext);

	useEffect(() => {
		async function checkAuth() {
			try {
				const res = await fetch(
					'http://localhost:3000/api/auth/status',
					{ credentials: 'include' },
				);
				const data = await res.json();

				if (res.ok) {
					setAuthorized(true);
					setAccountPic(data.image)
				};
			} catch (err) {
				setAuthorized(false);
				setAccountPic(null);
			};
		};
		checkAuth();
	}, []);

	return(
		<>
			<div className="pb-13">
			<Outlet />
			</div>
			<nav
				className="
					fixed bottom-0 left-0 z-50 w-full h-13 bg-mocha-crust
					border-t border-mocha-overlay0
				"
			>
				<div
					className="
						grid h-full max-w-lg grid-cols-4 mx-auto font-medium
					"
				>
					<NavLink
						to='/'
						className='
							inline-flex flex-col items-center justify-center
							px-5
						'
					>
						<HomeIcon />
					</NavLink>
					<NavLink
						to='/notifications' end
						className='
							inline-flex flex-col items-center justify-center
							px-5
						'
					>
						<NotificationsIcon />
					</NavLink>
					<ChatNavItem isAuthorized={authorized} />
					<ProfileNavItem isAuthorized={authorized} />
				</div>
			</nav>
		</>
	);
};
