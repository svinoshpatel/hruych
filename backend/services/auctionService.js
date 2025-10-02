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
