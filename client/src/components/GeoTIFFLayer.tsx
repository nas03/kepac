import { getRasterLayer } from '@/api';
import GeoRasterLayer from 'georaster-layer-for-leaflet';
import { useEffect } from 'react';

interface IPropsGeoTIFFLayer {
	map: L.Map;
}
const GeoTIFFLayer: React.FC<IPropsGeoTIFFLayer> = ({ map }) => {
	useEffect(() => {
		getRasterLayer().then((rasterLayer) => {
			const layer = new GeoRasterLayer(rasterLayer);
			layer.addTo(map);
			map.fitBounds(layer.getBounds());
		});
	}, []);

	return null;
};

export default GeoTIFFLayer;
