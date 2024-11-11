import { use } from '@/utils/utils';
import { Router } from 'express';
import { precipitationController } from '../controller';

const precipitationRoute = Router();

precipitationRoute.get(
	'/precipitation/medium',
	use(precipitationController.getMedianPrecipitation)
);

precipitationRoute.get(
	'/precipitation/district',
	use(precipitationController.getAvgPrecipitationByLocation)
);
export default precipitationRoute;
