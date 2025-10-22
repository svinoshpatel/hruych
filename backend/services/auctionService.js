import pool from "../config/database.js";
import getRelativeTime from "../utils/timeUtils.js";

export async function getAuctionById(auctionId) {
	const client = await pool.connect();
	try {
		const result = await client.query(
			'SELECT * FROM auction WHERE id = $1',
			[auctionId],
		);

		return result.rows[0] || null;
	} finally {
		client.release();
	};
};

export async function getAllAuctions() {
	const client = await pool.connect();
	try {
		const result = await client.query('SELECT * FROM auction');

		result.rows.forEach(auction => {
			auction.end_time = getRelativeTime(auction.end_time);
		});

		return result.rows;
	} finally {
		client.release();
	};
};

export async function getAuctionsByAccountId(accountId) {
	const client = await pool.connect();
	try {
		const result = await client.query(
			'SELECT * FROM auction WHERE author_id = $1',
			[accountId],
		);

		result.rows.forEach(auction => {
			auction.end_time = getRelativeTime(auction.end_time);
		});

		return result.rows;
	} finally {
		client.release();
	};
};

export async function createAuction(
	title, description, image, startingBid, minBidStep, isAutobuy,
	autobuyPrice, startTime, duration, accountId
) {
	const client = await pool.connect();

	const startTimeDate = new Date(startTime);
	const endTimeDate = new Date(startTimeDate);
	endTimeDate.setDate(startTimeDate.getDate() + duration);
	try {
		const result = await client.query(
			`INSERT INTO auction (
				title, description, image, starting_bid, min_bid_step,
				is_autobuy, autobuy_price, start_time, end_time, author_id
			) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
			[
				title, description, image, startingBid, minBidStep,
				isAutobuy, autobuyPrice, startTime, endTimeDate, accountId
			],
		);
		console.log('hahaha' + result.rows[0])
		return result.rows[0];
	} finally {
		client.release();
	};
};
