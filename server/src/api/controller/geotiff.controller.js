import fs from 'fs';

const getGeoTIFF = async (req, res) => {
	// Example file
	const filePath = 'assets/Radar_20201001000000.tif';
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
};

export { getGeoTIFF };
