// server.js
import cors from 'cors';
import express from 'express';
import fs from 'fs';

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

// Serve the GeoTIFF file
app.get('/api/geotiff', (req, res) => {
	const filePath =
		'/Users/anhson/Documents/Projects/kepac/client/src/assets/Radar_20201001000000.tif';

	// Check if the file exists
	fs.stat(filePath, (err, stats) => {
		if (err) {
			console.error('File not found:', err);
			return res.status(404).send('File not found');
		}

		// Set the appropriate headers for the TIFF file
		res.setHeader('Content-Type', 'image/tiff');
		res.setHeader(
			'Content-Disposition',
			'attachment; filename=Radar_20201001000000.tif'
		);

		// Create a read stream and pipe it to the response
		const fileStream = fs.createReadStream(filePath);
		fileStream.pipe(res);
	});
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
