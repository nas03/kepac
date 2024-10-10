import dotenv from 'dotenv';
import knex, { Knex } from 'knex';
dotenv.config();

const knexConfig: { [key: string]: Knex.Config } = {
	production: {
		client: 'pg',
		connection: {
			host: 'aws-0-ap-southeast-1.pooler.supabase.com',
			port: 6543,
			user: 'postgres.zfydybjluphaiojkxols',
			password: String(process.env.SUPABASE_PASSWORD),
			debug: true,
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

const db = knex({
	client: 'pg',
	connection: {
		connectionString: `postgresql://postgres.zfydybjluphaiojkxols:${process.env.SUPABASE_PASSWORD}@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres`,
	},
});

export default db;
