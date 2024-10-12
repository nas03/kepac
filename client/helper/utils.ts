export const formatToISOWithTimezone = (dateInput: string) => {
	const date = new Date(dateInput);
	const isoString = date.toLocaleString();
	if (isoString === 'Invalid Date') return 'None';
	return isoString;
};
export const formatToDate = (dateInput: string) => {
	const time = new Date(dateInput).toLocaleTimeString();
	const date =  new Date(dateInput).toLocaleDateString();
  return `${date} - ${time}`
};
export const formatPrecipitation = (precipitation: number) => {
	return `${precipitation.toFixed(3)} mm`;
};
