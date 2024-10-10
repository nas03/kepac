import db from "@/config/knex";
import { GeoTIFFStats } from "@/types";

export const uploadGeoTIFFFile = async (
	payload: GeoTIFFStats | GeoTIFFStats[]
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
