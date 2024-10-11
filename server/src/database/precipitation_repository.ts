import db from '@/config/knex';
import { AvgPrecipitation, PrecipitationRepo } from '@/types';

export const uploadGeoTIFFFile = async (
	payload: PrecipitationRepo | PrecipitationRepo[]
) => {
	const query = await db('precipitation').insert(payload);
	return query ? true : false;
};

export const getGeoTIFFFile = async (time: string) => {
	const query = await db('precipitation')
		.whereRaw('DATE(birthtime) = DATE(?::timestamp)', [time])
		.andWhereRaw(
			'EXTRACT(HOUR FROM birthtime) = EXTRACT(HOUR FROM ?::timestamp)',
			[time]
		)
		.limit(1)
		.select('*')
		.first();
	return query;
};

export const uploadDataset = async (payload: {
	avg_precipitation?: AvgPrecipitation[];
	precipitation?: PrecipitationRepo[];
}) => {
	try {
		const query = await db.transaction(async (trx) => {
			if (payload.avg_precipitation) {
				await trx('avg_precipitation').insert(payload.avg_precipitation);
			}
			if (payload.precipitation) {
				await trx('precipitation').insert(payload.precipitation);
			}
		});
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
};
