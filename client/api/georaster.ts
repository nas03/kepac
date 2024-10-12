import api from '@/helper/axios';
import parseGeoraster from 'georaster';

export const getRasterLayer = async (time: string) => {
	try {
		const response = await api.get('/geotiff', {
			params: {
				time: time,
			},
			responseType: 'arraybuffer',
		});
		const georaster = await parseGeoraster(response.data);
		const rasterLayer = {
			pixelValuesToColorFn: function (pixelValues: number[]) {
				const pixelValue = pixelValues[0];
				if (pixelValue < 0.2) return null;
				if (pixelValue <= 1) return '#3a92a1';
				if (pixelValue <= 5) return '#49a43a';
				if (pixelValue <= 30) return '#993839';
				if (pixelValue > 30) return '#a33782';
				else return null;
			},
			resolution: 256,
			opacity: 0.7,
			georaster: georaster,
		};

		return { layer: rasterLayer, georaster: georaster };
	} catch (error) {
		console.log(error);
		return { layer: null, georaster: null };
	}
};
