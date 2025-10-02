import * as accountService from '../services/accountService.js';

export async function getAccountById(req, res, next) {
	try {
		const accountId = req.params.id; 		
		const account = await accountService.getAccountById(accountId);

		if (!account)
			return res.status(404).json({ message: 'Account not found' });	

		return res.status(200).json(account);
	} catch (error) {
		next(error);	
	};
};
