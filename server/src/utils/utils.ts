export const getFilename = (path: string) => {
	const buffer = String(path).split('/');
	return buffer[buffer.length - 1];
};

export const use = (fn: Function) => (req: any, res: any, next: any) => {
	Promise.resolve(fn(req, res, next)).catch(next);
};

export const getTimeInfoFromFilename = (filename: string) => {
	const parts = filename.split('_')[1];
	return new Date(
		parseInt(parts.slice(0, 4)), // year
		parseInt(parts.slice(4, 6)) - 1, // month (0-indexed)
		parseInt(parts.slice(6, 8)), // day
		parseInt(parts.slice(8, 10)), // hour
		parseInt(parts.slice(10, 12)), // minute
		parseInt(parts.slice(12, 14)) // second
	);
};
