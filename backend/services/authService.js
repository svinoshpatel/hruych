import pool from '../config/database.js';
import bcrypt from 'bcrypt';

export async function signup(displayName, username, email, password) {
	const client = await pool.connect();  	
	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		const response = await client.query(
			`INSERT INTO account (display_name, username, email, password)
				VALUES ($1, $2, $3, $4);`,
			[displayName, username, email, hashedPassword],
		);
		return response.rows[0];
	} finally {
		client.release();
	};
};
