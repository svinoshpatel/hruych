import { createContext, useState } from "react";
import accountPng from './assets/user.png';

export const AccountContext = createContext(null);

export function AccountProvider({ children }) {
	const [account, setAccount] = useState(accountPng);
	const [authorized, setAuthorized] = useState(false);

	return(
		<AccountContext.Provider value={{
			account,
			setAccount,
			authorized,
			setAuthorized
		}}>
			{children}
		</AccountContext.Provider>
	);
};
