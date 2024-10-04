import { exec } from 'child_process';
import { Client } from 'pg';
import fs from 'fs';
import path from 'path';

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

convertToSQL('/Users/anhson/Downloads/DATA_SV/Precipitation/Radar/2020/10/01/Radar_20201001000000.tif', './output.sql')
// Execute PostgreSQL execution file
async function executeSqlFile(filePath) {
	try {
		const client = new Client({
			user: 'your_username',
			host: 'localhost',
			database: 'your_database',
			password: 'your_password',
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
