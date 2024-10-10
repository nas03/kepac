import { avgPrecipitationRepository } from '@/database';
import type { Request, Response } from 'express';

export const getMedianPrecipitation = async (req: Request, res: Response) => {
	try {
		const time = String(req.query.time);
		if (!time) {
			return res.status(400).json({
				status: 'error',
				message: 'Time is not specified',
				data: null,
			});
		}
		const data = await avgPrecipitationRepository.getMedianPrecipitation(time);
		return res.status(200).json({
			status: 'ok',
			message: null,
			data,
		});
	} catch (error) {
		console.log('Server error', error);
		return res.status(500).json({
			status: 'error',
			message: 'Server Error',
			data: null,
		});
	}
};
