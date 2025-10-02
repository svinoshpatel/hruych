import { Pool } from 'pg';
import 'dotenv/config';

const pool = new Pool({
	host: process.env.DB_HOST, 
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	max: 20, // look at documentation later, maybe change
	idleTimeoutMillis: 30000, // same
	connectionTimeoutMillis: 2000, // same
	maxLifetimeSeconds: 60, // same
});

export default pool;
