import { getRasterLayer } from '@/api';
import { demoTime } from '@/data/time-demo.ts';
import GeoRasterLayer from 'georaster-layer-for-leaflet';
import { useEffect } from 'react';

interface IPropsGeoTIFFLayer {
	map: L.Map;
	time: number;
}
const GeoTIFFLayer: React.FC<IPropsGeoTIFFLayer> = ({ map, time }) => {
	useEffect(() => {
		console.log({ time });
		getRasterLayer(demoTime[time / 2])
			.then((rasterLayer) => {
				map.eachLayer((layer) => {
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					if ((layer as any).rasters && (layer as any).georasters) {
						map.removeLayer(layer);
					}
				});

				if (!rasterLayer) {
					return null;
				}
				const layer = new GeoRasterLayer(rasterLayer);
				map.addLayer(layer);
				map.fitBounds(layer.getBounds());
			})
			.catch((error) => {
				map.eachLayer((layer) => {
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					if ((layer as any).rasters && (layer as any).georasters) {
						map.removeLayer(layer);
					}
				});
				return null;
			});
	}, [time]);

	return null;
};

export default GeoTIFFLayer;
