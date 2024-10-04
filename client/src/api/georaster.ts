import api from '@/helper/axios';
import parseGeoraster from 'georaster';

export const getRasterLayer = async () => {
	const response = await api.get('/geotiff', {
		responseType: 'arraybuffer',
	});
	const georaster = await parseGeoraster(response.data);
	const rasterLayer = {
		pixelValuesToColorFn: function (pixelValues: number[]) {
			const pixelValue = pixelValues[0];
			if (pixelValue === 0) return null;
			if (pixelValue === -Infinity) return '#FF0000';
			if (pixelValue > 0) return '#0000FF';
		},
		resolution: 256,
		opacity: 1,
		georaster: georaster,
	};

	return rasterLayer;
};
