export const formatToISOWithTimezone = (dateInput: string) => {
  const date = new Date(dateInput);
  const isoString = date.toLocaleString();
  if (isoString === "Invalid Date") return "None";
  return isoString;
};
export const formatToDate = (dateInput: string) => {
  return new Date(dateInput).toLocaleDateString();
};
export const formatPrecipitation = (precipitation: number) => {
  return `${precipitation.toFixed(3)} mm`;
};
