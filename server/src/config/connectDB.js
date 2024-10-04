import { Pool } from 'pg';

// Database configuration
const dbConfig = {
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	password: process.env.DB_PASSWORD,
	port: Number(process.env.DB_PORT) || 5432,
	// Add SSL configuration if needed
	// ssl: {
	//     rejectUnauthorized: false
	// }
};

// Create a new pool instance
const pool = new Pool(dbConfig);

// Event listener for errors
pool.on('error', (err) => {
	console.error('Unexpected error on idle client', err);
	process.exit(-1);
});

// Function to get a client from the pool
const getClient = async () => {
	const client = await pool.connect();
	const query = client.query.bind(client);

	// Monkey patch the query method to keep track of last query
	client.query = (...args) => {
		client.lastQuery = args;
		return query(...args);
	};

	// Monkey patch to release client back to pool on error
	const release = client.release.bind(client);
	client.release = () => {
		client.query = query;
		client.release = release;
		return release();
	};

	return client;
};

module.exports = {
	pool,
	getClient,
	query: (text, params) => pool.query(text, params),
};
