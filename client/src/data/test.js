import fs from 'fs';
import { fromArrayBuffer } from 'geotiff';
import path from 'path';

const filePath = path.resolve(__dirname, '../assets/Radar_20201001000000.tif');

fs.readFile(filePath, (err, data) => {
	if (err) {
		console.error('Error reading file:', err);
		return;
	}

	const arrayBuffer = data.buffer.slice(
		data.byteOffset,
		data.byteOffset + data.byteLength
	);

	fromArrayBuffer(arrayBuffer).then((tiff) => {
		if (tiff) {
			console.log('ok');
		}
		if (!tiff) {
			console.log('not ok');
		}
		const image = tiff.getImage().then((image) => {
			const rasters = image.readRasters().then((raster) => {
				console.log({ raster });
			});
		});
	});
});
