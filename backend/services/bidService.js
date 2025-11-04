import pool from '../config/database.js';

export async function getAllAuctionBids(auctionId) {
	const client = await pool.connect();
	try {
		const result = await client.query(
			`SELECT
				a.id,
				a.image,
				a.display_name,
				a.username,
				b.price
			FROM bid b
			JOIN account a ON b.account_id = a.id
			WHERE b.auction_id = $1
			ORDER BY b.price DESC`,
			[auctionId],
		);
		return result.rows;
	} finally {
		client.release();
	};
};

export async function createBid(auctionId, accountId, price) {
	const client = await pool.connect();
	try {
		const result = await client.query(
			`INSERT INTO bid (auction_id, account_id, price)
			VALUES ($1, $2, $3)`,
			[auctionId, accountId, price],
		);
		return result.rows[0];
	} finally {
		client.release();
	};
};
