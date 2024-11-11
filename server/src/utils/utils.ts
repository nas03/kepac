import fs from 'fs';
import { Client } from 'pg';
export const getFilename = (path: string) => {
	const buffer = String(path).split('/');
	return buffer[buffer.length - 1];
};

export const use = (fn: Function) => (req: any, res: any, next: any) => {
	Promise.resolve(fn(req, res, next)).catch(next);
};

export const getTimeInfoFromFilename = (filename: string) => {
	const parts = filename.split('_')[1];
	return new Date(
		parseInt(parts.slice(0, 4)), // year
		parseInt(parts.slice(4, 6)) - 1, // month (0-indexed)
		parseInt(parts.slice(6, 8)), // day
		parseInt(parts.slice(8, 10)), // hour
		parseInt(parts.slice(10, 12)), // minute
		parseInt(parts.slice(12, 14)) // second
	);
};

import { exec } from 'child_process';
import path from 'path';

// Convert .tif file to PostgreSQL query file
export const convertToSQL = (inputFile: string, outputFile: string) => {
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

// convertToSQL(
// 	'/Users/anhson/Downloads/DATA_SV/Precipitation/Radar/2020/10/01/Radar_20201001230000.tif',
// 	'assets/sql/output.sql'
// );

// Execute PostgreSQL execution file
async function executeSqlFile(filePath: string) {
	try {
		const client = new Client({
			user: 'postgres',
			host: 'localhost',
			database: 'air_quality',
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

export const removeVietnameseAccents = (str: string) => {
	return str
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/đ/g, 'd')
		.replace(/Đ/g, 'D');
}
// executeSqlFile(
// 	'/Users/anhson/Documents/Projects/kepac/server/assets/sql/output.sql'
// );
