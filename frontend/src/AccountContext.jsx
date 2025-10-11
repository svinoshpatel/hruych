import { createContext, useState } from "react";
import accountPng from './assets/user.png';

export const AccountContext = createContext(null);

export function AccountProvider({ children }) {
	const [account, setAccount] = useState(accountPng);

	return(
		<AccountContext.Provider value={{ account, setAccount }}>
			{children}
		</AccountContext.Provider>
	);
};
