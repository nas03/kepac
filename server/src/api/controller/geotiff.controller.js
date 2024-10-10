import fs from 'fs';
import fsPromise from 'fs/promises';
import { precipitationRepository } from '../../database/index.js';
import { getFilename } from '../../utils/utils.js';

const getGeoTIFF = async (req, res) => {
	try {
		// Example file
		const { time } = req.query;
		// const time = '2024-10-04T18:14:17.667000+00:00';
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

const getGeneralInfo = async (req, res) => {
	try {
		const filePath = 'assets/Radar_20201001000000.tif';
		const fileStats = await fsPromise.stat(filePath);

		const data = {
			size: fileStats.size,
			atime: fileStats.atime,
			mtime: fileStats.mtime,
			ctime: fileStats.ctime,
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

const uploadGeoTiffFile = async (req, res) => {
	try {
		const path = req.body.path;
		const fileName = getFilename(path);
		const filePath = `assets/geotiff/${fileName}`;
		const fileStats = await fsPromise.stat(filePath);
		const payload = {
			file_name: fileName,
			path: filePath,
			atime: fileStats.atime,
			mtime: fileStats.mtime,
			ctime: fileStats.ctime,
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

const loadSampleData = async (req, res) => {
	try {
		const files = await fsPromise.readdir('assets/geotiff');
		const payload = await Promise.all(
			files.map(async (file) => {
				const filePath = `assets/geotiff/${file}`;
				const fileStats = await fsPromise.stat(filePath);
				// Extract the relevant parts of the filename
				const year = file.split('_')[1].slice(0, 4);
				const month = file.split('_')[1].slice(4, 6);
				const day = file.split('_')[1].slice(6, 8);
				const hour = file.split('_')[1].slice(8, 10);
				const minute = file.split('_')[1].slice(10, 12);
				const second = file.split('_')[1].slice(12, 14);

				// Create a JavaScript Date object
				const timeInfo = new Date(
					parseInt(year),
					parseInt(month) - 1, // Month is 0-indexed in JavaScript Date (0 for January, 11 for December)
					parseInt(day),
					parseInt(hour),
					parseInt(minute),
					parseInt(second)
				);

				// Print the extracted date and time
				console.log('Extracted datetime:', timeInfo);
				return {
					file_name: file,
					path: filePath,
					atime: fileStats.atime,
					mtime: fileStats.mtime,
					ctime: fileStats.ctime,
					birthtime: timeInfo,
				};
			})
		);
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
export { getGeneralInfo, getGeoTIFF, loadSampleData, uploadGeoTiffFile };
