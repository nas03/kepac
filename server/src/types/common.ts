type PrecipitationRepo = {
	id?: number;
	file_name: string;
	path: string;
	birthtime: Date;
};

type AvgPrecipitation = {
	id?: number;
	district_id: number;
	avg_precipitation: number;
	geo_id: string;
	province_name: string;
	district_name: string;
	district_code: string;
	geo_type: 'District' | 'City' | 'Town' | 'Urban District';
	time: Date;
};
export { AvgPrecipitation, PrecipitationRepo };
