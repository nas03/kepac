import { Router } from 'express';
import { precipitationController } from '../controller/index.js';

const precipitationRoute = Router();

precipitationRoute.get(
	'/precipitation/medium',
	precipitationController.getMedianPrecipitation
);

export default precipitationRoute;
