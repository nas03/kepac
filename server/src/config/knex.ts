import knex, { Knex } from 'knex';

const knexConfig: { [key: string]: Knex.Config } = {
	production: {
		client: 'pg',
		connection: {
			connectionString: `postgresql://postgres.zfydybjluphaiojkxols:${process.env.SUPABASE_PASSWORD}@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres`,
		},
	},
	development: {
		client: 'pg',
		connection: {
			host: 'localhost',
			port: 5432,
			user: 'postgres',
			password: '',
			database: 'postgres',
		},
		debug: true,
	},
};

const db = knex(knexConfig[String(process.env.NODE_ENV)]);

export default db;
