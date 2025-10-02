import pool from "../config/database.js";

export async function getAccountById(accountId) {
	const client = await pool.connect();
	try {
		const result = await client.query(
			'SELECT * FROM account WHERE id = $1',
			[accountId],
		);

		return result.rows[0] || null;
	} finally {
		client.release();
	};
};
