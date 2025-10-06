import pool from '../config/database.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

export async function signin(usernameOrEmail, loginPassword) {
	const client = await pool.connect();
	try {
		const response = await client.query(
			`SELECT password FROM account
			WHERE username = $1 OR email = $1;`,
			[usernameOrEmail],
		);
		
		if (response.rows.length === 0)
			throw new Error('User not found');

		const hash = response.rows[0].password;
		const valid = await bcrypt.compare(loginPassword, hash);

		if (!valid)
			throw new Error('Invalid password');

		const token = jwt.sign(
			{ usernameOrEmail },
			process.env.SECRET,
			{ expiresIn: '1h' }
		);	

		return token;
	} finally {
		client.release();
	};
};
