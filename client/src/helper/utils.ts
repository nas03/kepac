export const formatToISOWithTimezone = (dateInput: string) => {
	const date = new Date(dateInput);
	const isoString = date.toLocaleString();
	return isoString;
};

export const formatPrecipitation = (precipitation: number) => {
	return `${precipitation.toFixed(3)} mm`;
};
