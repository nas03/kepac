export const getFilename = (path: string) => {
	const buffer = String(path).split('/');
	return buffer[buffer.length - 1];
};

export const use = (fn: Function) => (req: any, res: any, next: any) => {
	Promise.resolve(fn(req, res, next)).catch(next);
};
