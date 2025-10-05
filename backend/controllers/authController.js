import * as authService from '../services/authService.js';

export async function signup(req, res, next) {
	try {
		const { displayName, username, email, password } = req.body;	
		console.log("reqired success");

		if (!displayName || !username || !email || !password) {
			return res.status(400).json({ error: 'All fields are required' });
		};

		const account = await
			authService.signup(displayName, username, email, password);

		return res.status(201).json({ message: 'Account created', account});
	} catch (error) {
		next(error);
	};
};
