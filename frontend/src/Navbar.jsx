import { Outlet } from "react-router";
import { NavLink } from "react-router";
import HomeIcon from './assets/HomeIcon';
import NotificationsIcon from "./assets/NotificationsIcon";
import ProfilePic from "./components/ProfilePic";
import ChatNavItem from "./components/ChatNavItem";
import { useContext } from "react";
import { AccountContext } from "./AccountContext";

export default function Navbar() {
	const { account } = useContext(AccountContext);

	return(
		<>
			<Outlet />
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
					<ChatNavItem isAuthorized={false} />
					<NavLink
						to='/account/me' end
						className='
							inline-flex flex-col items-center justify-center
							px-5
						'
					>
						<ProfilePic
							className='
								size-8 outline-mocha-text outline-2
							'
							src={account}
						/>
					</NavLink>
				</div>
			</nav>
		</>
	);
};
