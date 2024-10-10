import { use } from '@/utils/utils';
import { Router } from 'express';
import { precipitationController } from '../controller';

const precipitationRoute = Router();

precipitationRoute.get(
	'/precipitation/medium',
	use(precipitationController.getMedianPrecipitation)
);

export default precipitationRoute;
