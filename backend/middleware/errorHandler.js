export default function errorHandler(err, req, res, next) {
	console.error(err);

	if (err.statusCode) {
		res.status(err.statusCode).json({ message: err.message });
	} else {
		res.status(500).json({ message: 'Server error' });
	};
};
