import db from '@/config/knex';
import { AvgPrecipitation } from '@/types';

export const getMedianPrecipitation = async (time: string) => {
	const query = await db('avg_precipitation')
		.select('*')
		.where({
			time: time,
			geo_type: 'District',
		})
		.andWhere('avg_precipitation', '>', 0.2)
		.orderBy('avg_precipitation', 'desc'); // Correct way to add comparison
	return query;
};

export const uploadData = async (payload: AvgPrecipitation[]) => {
	const query = await db('avg_precipitation').insert(payload);
	if (!query) return false;
	return true;
};
