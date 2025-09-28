import express from 'express';
import path from 'path';
import cors from 'cors';
import { Pool } from 'pg';

const app = express();
const port = 3000;

function getRelativeTime(date) {
	const now = new Date();
	const endTime = new Date(date);

	const diffInSeconds = Math.floor((endTime - now) / 1000);
	const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

	if (Math.abs(diffInSeconds) < 60) {
		return rtf.format(diffInSeconds, 'second');
	};
	
	const diffInMinutes = Math.floor(diffInSeconds / 60);
	if (Math.abs(diffInMinutes) < 60) {
		return rtf.format(diffInMinutes, 'minute');
	};

	const diffInHours = Math.floor(diffInMinutes / 60);
	if (Math.abs(diffInHours) < 24) {
		return rtf.format(diffInHours, 'hour');
	};

	const diffInDays = Math.floor(diffInHours / 24);
		return rtf.format(diffInDays, 'day');
};

const pool = new Pool({
	host: 'localhost',
	user: 'postgres',
	password: 'svin',
	database: 'hruych',
	max: 20, // look at documentation later, maybe change
	idleTimeoutMillis: 30000, // same
	connectionTimeoutMillis: 2000, // same
	maxLifetimeSeconds: 60, // same
});

app.use(cors());

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.get('/api/auction/:id', async (req, res) => {
	const auctionId = req.params.id;
	try {
		const client = await pool.connect();
		const result = await client.query(
			'SELECT * FROM auction WHERE id = $1',
			[auctionId],
		);
		client.release();

		if (result.rows.length === 0) {
			return res.status(404).json({ message: 'Auction not found' });	
		};

		res.status(200).json(result.rows[0]);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server error' }); 
	};
}); 

app.get('/api/auction/', async (_, res) => {
	try {
		const client = await pool.connect();
		const result = await client.query(
			'SELECT * FROM auction',
		);
		client.release();

		if (result.rows.length === 0) {
			// "No auctions" message!
		};

		result.rows.forEach(auction => {
			const endTime = auction.end_time;
			const relativeTime = getRelativeTime(endTime);
			auction.end_time = relativeTime;
		});

		res.status(200).json(result.rows);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server error' });
	};
});

app.get('/api/account/:id', async (req, res) => {
	const accountId = req.params.id;
	try {
		const client = await pool.connect();
		const result = await client.query(
			'SELECT * FROM account WHERE id = $1',
			[accountId],
		);
		client.release();

		if (result.rows.length === 0) {
			res.status(404).json({ message: 'Account not found' });
		};

		res.status(200).json(result.rows[0]);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server error' });
	};
});

app.listen(port, () => {
	console.log('Server started');
});
