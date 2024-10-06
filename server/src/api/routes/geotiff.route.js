import { Router } from 'express';
import { geotiffController } from '../controller/index.js';

const geoTIFFRoute = Router();

geoTIFFRoute.get('/geotiff', geotiffController.getGeoTIFF);
geoTIFFRoute.get('/geotiff/info', geotiffController.getGeneralInfo);
geoTIFFRoute.post('/geotiff/upload', geotiffController.uploadGeoTiffFile);
geoTIFFRoute.post('/geotiff/dataset', geotiffController.loadSampleData);

export default geoTIFFRoute;
