import jwt from 'jsonwebtoken';

export default function authHandler(req, res, next) {
	const token = req.cookies.token;
	if (!token)
		return res.status(401).json({ message: 'No token'});

	jwt.verify(token, process.env.SECRET, (err, decoded) => {
		if (err)
			return res.status(401).json({ message: 'Invalid token'});
		req.accountId = decoded.id;
		next();
	});
};
