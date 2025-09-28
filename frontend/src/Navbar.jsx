import { Outlet } from "react-router";
import { NavLink } from "react-router";
import HomeIcon from './assets/HomeIcon';
import ChatIcon from './assets/ChatIcon';
import NotificationsIcon from "./assets/NotificationsIcon";
import ProfilePic from "./components/ProfilePic";

export default function Navbar() {
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
					<NavLink
						to='/chat' end
						className='
							inline-flex flex-col items-center justify-center
							px-5
						'
					>
						<ChatIcon />
					</NavLink>
					<NavLink
						to='/account/6' end
						className='
							inline-flex flex-col items-center justify-center
							px-5
						'
					>
						<ProfilePic
							className='
								size-8 outline-mocha-text outline-2
							'
						/>
					</NavLink>
				</div>
			</nav>
		</>
	);
};
