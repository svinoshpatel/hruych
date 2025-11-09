import pool from './config/database.js';

export default async function checkAndCloseAuctions() {
	try {
		const client = await pool.connect();
		try {
			await client.query('BEGIN');

			const auctionsToClose = await client.query(
				`SELECT id FROM auction
				WHERE end_time <= NOW() AND is_open = true FOR UPDATE`
			);

			for (const row of auctionsToClose.rows) {
				const auctionId = row.id;

				const highestBid = await client.query(
					`SELECT account_id, price FROM bid WHERE auction_id = $1
					ORDER BY price DESC LIMIT 1`,
					[auctionId]
				);

				if (highestBid.rows.length === 0) {
					await client.query(
						`UPDATE auction SET is_open = false WHERE id = $1`,
						[auctionId]
					);
				} else {
					const { account_id } = highestBid.rows[0];
					await client.query(
						`UPDATE auction SET is_open = false,
						winner_id = $1 WHERE id = $2`,
						[account_id, auctionId]
					);
				};
			};

			await client.query('COMMIT');
		} catch (err) {
			await client.query('ROLLBACK');
			console.error(`transaction error: ${err}`);
		} finally {
			client.release();
		}
	} catch (err) {
		console.error(`database connection error: ${err}`);
	};
};
