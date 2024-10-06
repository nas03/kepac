import knex from 'knex';

const db = knex({
	client: 'pg',
	connection: {
		host: 'localhost',
		port: 5432,
		user: 'postgres',
		password: '',
		database: 'postgres',
	},
});

export default db;
