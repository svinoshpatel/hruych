import pool from '../config/database.js';
import { NotFoundError, BadRequestError, ForbiddenError } from '../utils/errorTypes.js';

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
		await client.query('BEGIN');
		const { rows: auctionRows } = await client.query(
			`SELECT starting_bid, min_bid_step, end_time FROM auction
				WHERE id = $1 FOR UPDATE`,
			[auctionId]
		);
		if (auctionRows.length === 0)
			throw new NotFoundError('Auction not found');
		const startingBid = auctionRows[0].starting_bid;
		const minBidStep = auctionRows[0].min_bid_step;
		const endTime = new Date(auctionRows[0].end_time);

		if (endTime <= Date.now())
			throw new ForbiddenError('Bid rejected: the auction is closed');

		const { rows: bidRows } = await client.query(
			`SELECT price FROM bid WHERE auction_id = $1
			ORDER BY price DESC LIMIT 1`,
			[auctionId]
		);
		const highestBid = bidRows.length > 0 ? bidRows[0].price : 0;
		
		if (price <= startingBid || price <= highestBid + minBidStep) {
			throw new BadRequestError(
				'Bid must be higher than starting bid ' +
					'and the current max bid + minimal bid step '
			);
		};

		const result = await client.query(
			`INSERT INTO bid (auction_id, account_id, price)
			VALUES ($1, $2, $3)`,
			[auctionId, accountId, price],
		);

		await client.query('COMMIT');
		return result.rows[0];
	} catch (err) {
		await client.query('ROLLBACK');
		console.error(`transaction error: ${err}`);
		throw err;
	} finally {
		client.release();
	};
};
