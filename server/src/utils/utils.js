import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import pg from 'pg';

// Convert .tif file to PostgreSQL query file
export const convertToSQL = (inputFile, outputFile) => {
	try {
		const tableName = 'raster_table';

		const command = `raster2pgsql -s SRID -I -C ${inputFile} public.${tableName} > ${outputFile}`;

		exec(command, (error, stdout, stderr) => {
			if (error) {
				console.error(`Error executing command: ${error.message}`);
				return;
			}
			if (stderr) {
				console.error(`Error: ${stderr}`);
			}
			console.log(`SQL file generated at ${outputFile}`);
		});
	} catch (error) {
		console.log(error);
	}
};

// Execute PostgreSQL execution file
async function executeSqlFile(filePath) {
	try {
		const client = new pg.Client({
			user: 'postgres',
			host: 'localhost',
			database: 'postgres',
			password: '',
			port: 5432,
		});

		try {
			await client.connect();
			const sql = fs.readFileSync(path.resolve(filePath), 'utf8');
			await client.query(sql);
			console.log('SQL file executed successfully');
		} catch (error) {
			console.error('Error executing SQL file:', error);
		} finally {
			await client.end();
		}
	} catch (error) {
		console.log(error);
	}
}

export const getFilename = (path) => {
	const buffer = String(path).split('/');
	return buffer[buffer.length - 1];
};