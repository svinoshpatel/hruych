import { createContext, useState } from "react";
import accountPng from './assets/user.png';

export const AccountContext = createContext(null);

export function AccountProvider({ children }) {
	const [accountPic, setAccountPic] = useState(accountPng);
	const [authorized, setAuthorized] = useState(false);

	return(
		<AccountContext.Provider value={{
			accountPic,
			setAccountPic,
			authorized,
			setAuthorized
		}}>
			{children}
		</AccountContext.Provider>
	);
};
