import db from '../config/knex.js';

export const uploadGeoTIFFFile = async (payload) => {
	const query = await db('precipitation').insert(payload);
	return query ? true : false;
};

export const getGeoTIFFFile = async (time) => {
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
