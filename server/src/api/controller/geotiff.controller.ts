import { precipitationRepository } from '@/database';
import { getFilename, getTimeInfoFromFilename } from '@/utils/utils';
import childProc from 'child_process';
import csv from 'csvtojson/v2';
import type { Request, Response } from 'express';
import fs from 'fs';
import fsPromise from 'fs/promises';
const getGeoTIFF = async (req: Request, res: Response) => {
	try {
		const time = String(req.query.time) || '';
		if (!time) {
			return res.status(400).json({
				status: 'error',
				message: 'Time is not specified',
				data: null,
			});
		}
		const geoTIFFFile = await precipitationRepository.getGeoTIFFFile(time);
		if (!geoTIFFFile) {
			return res.status(200).json({
				status: 'success',
				message: null,
				data: null,
			});
		}
		const filePath = `assets/geotiff/${geoTIFFFile.file_name}`;
		fs.stat(filePath, (err, stats) => {
			if (err) {
				console.error('File not found', err);
				return res.status(404).json({
					status: 'error',
					message: 'File not found',
					data: null,
				});
			}

			// set Header for TIFF file
			res.setHeader('Content-Type', 'image/tiff');
			res.setHeader(
				'Content-Disposition',
				'attachment; filename=Radar_20201001000000.tif'
			);

			const fileStream = fs.createReadStream(filePath);
			fileStream.pipe(res);
		});
	} catch (error) {
		return res.status(500).json({
			status: 'error',
			message: 'Server Error',
			data: null,
		});
	}
};

const getGeneralInfo = async (req: Request, res: Response) => {
	try {
		const filePath = 'assets/Radar_20201001000000.tif';
		const fileStats = await fsPromise.stat(filePath);

		const data = {
			size: fileStats.size,
			birthtime: fileStats.birthtime,
		};
		return res.status(200).json({
			status: 'success',
			message: null,
			data: data,
		});
	} catch (error) {
		console.log('Server error', error);
		return res.status(500).json({
			status: 'error',
			message: 'Server Error',
			data: null,
		});
	}
};

const uploadGeoTiffFile = async (req: Request, res: Response) => {
	try {
		const path = req.body.path;
		const fileName = getFilename(path);
		const filePath = `assets/geotiff/${fileName}`;
		const fileStats = await fsPromise.stat(filePath);
		const payload = {
			file_name: fileName,
			path: filePath,
			birthtime: fileStats.birthtime,
		};
		const uploadFile = await precipitationRepository.uploadGeoTIFFFile(payload);
		if (!uploadFile) {
			return res.status(500).json({
				status: 'error',
				message: 'Error Uploading to Database',
				data: null,
			});
		}
		return res.status(200).json({
			status: 'success',
			message: null,
			data: payload,
		});
	} catch (error) {
		console.log('Server error', error);
		return res.status(500).json({
			status: 'error',
			message: 'Server Error',
			data: null,
		});
	}
};

const loadSampleData = async (req: Request, res: Response) => {
	try {
		const files = await fsPromise.readdir('assets/geotiff');
		const precipitationPayload = files.map((file) => ({
			file_name: file,
			path: `assets/geotiff/${file}`,
			birthtime: getTimeInfoFromFilename(file),
		}));

		// Exec python file
		childProc.execSync('python3 scripts/extract.py');
		const avgPrecipitationPayload = await csv().fromFile('assets/csv/data.csv');

		const payload = {
			avg_precipitation: avgPrecipitationPayload,
			precipitation: precipitationPayload,
		};
		const uploadData = await precipitationRepository.uploadDataset(payload);
		if (!uploadData) {
			return res.status(500).json({
				status: 'error',
				message: 'Error uploading to database',
				data: null,
			});
		}
		return res.status(200).json({
			status: 'success',
			message: null,
			data: null,
		});
	} catch (error) {
		console.log('Server error', error);
		return res.status(500).json({
			status: 'error',
			message: 'Server Error',
			data: null,
		});
	}
};
export { getGeneralInfo, getGeoTIFF, loadSampleData, uploadGeoTiffFile };
