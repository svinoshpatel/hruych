import { createContext, useState } from "react";
import accountPng from './assets/user.png';
import { useEffect } from "react";

export const AccountContext = createContext(null);

function getInitialAccountId() {
  const storedId = localStorage.getItem("accountId");
  return storedId ? JSON.parse(storedId) : undefined;
}

export function AccountProvider({ children }) {
	const [accountPic, setAccountPic] = useState(accountPng);
	const [accountId, setAccountId] = useState(getInitialAccountId);
	const [authorized, setAuthorized] = useState(false);

	useEffect(() => {
		if (accountId !== undefined) {
			localStorage.setItem("accountId", JSON.stringify(accountId));
		} else {
			localStorage.removeItem("accountId");
		}
	}, [accountId]);

	return(
		<AccountContext.Provider value={{
			accountPic,
			setAccountPic,
			authorized,
			setAuthorized,
			accountId,
			setAccountId
		}}>
			{children}
		</AccountContext.Provider>
	);
};
