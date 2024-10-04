import { Router } from 'express';
import { geotiffController } from '../controller';

const geoTIFFRoute = Router();

geoTIFFRoute.get('/geotiff', geotiffController.getGeoTIFF);

export default geoTIFFRoute;
