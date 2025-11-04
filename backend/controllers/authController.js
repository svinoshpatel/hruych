import * as authService from '../services/authService.js';

export async function signup(req, res, next) {
	try {
		const { displayName, username, email, password } = req.body;

		if (username.includes('@')) {
			return res.status(400).json(
				{ error: "Username must not contain '@'"}
			);
		};

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

export async function signin(req, res, next) {
	try {
		const { usernameOrEmail, loginPassword } = req.body;
		const { token, image, id } = await authService
			.signin(usernameOrEmail, loginPassword);
		res.cookie('token', token, {
			httpOnly: true,
			secure: false,
			sameSite: 'lax',
			maxAge: 3600000,
			path: '/'
		});
		res.status(200).json({ image, id });
	} catch (error) {
		res.status(401).json({ error: error.message });
	};
};

export async function status(req, res, next) {
	try {
		const accountId = req.accountId;
		const image = await authService.status(accountId);
		res.status(200).json({ image });
	} catch (err) {
		next(err);
	};	
};
