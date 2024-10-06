import { getRasterLayer } from '@/api';
import { demoTime } from '@/data/time-demo.ts';
import geoblaze from 'geoblaze';
import GeoRasterLayer from 'georaster-layer-for-leaflet';
import { Layer } from 'leaflet';
import { useEffect } from 'react';
interface IPropsGeoTIFFLayer {
	map: L.Map;
	time: number;
	onPrecipitationChange: (precipitation: number) => void;
}
const GeoTIFFLayer: React.FC<IPropsGeoTIFFLayer> = ({
	map,
	time,
	onPrecipitationChange,
}) => {
	const clearPreviousLayer = (map: L.Map) => {
		map.eachLayer((layer) => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			if ((layer as any).rasters && (layer as any).georasters) {
				map.removeLayer(layer);
			}
		});
	};
	useEffect(() => {
		getRasterLayer(demoTime[time / 2])
			.then((rasterLayer) => {
				clearPreviousLayer(map);

				if (!rasterLayer.layer) {
					return null;
				}
				const layer = new GeoRasterLayer(rasterLayer.layer);
				(layer as Layer)
					.bindTooltip('HGI', {
						direction: 'top',
					})
					.openTooltip();

				map.on('click', function (e) {
					const latlng = map.mouseEventToLatLng(e.originalEvent);
					const data = geoblaze.identify(rasterLayer.georaster, [
						latlng.lng,
						latlng.lat,
					]);
					onPrecipitationChange(data);
				});

				map.addLayer(layer);
				map.fitBounds(layer.getBounds());
			})
			.catch((error) => {
				console.log({ error });
				clearPreviousLayer(map);
				return null;
			});
	}, [time]);

	return null;
};

export default GeoTIFFLayer;
