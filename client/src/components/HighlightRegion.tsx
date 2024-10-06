import { vnGeo } from '@/data/vn-geo';
import geojson from 'geojson';
import L, { Layer, LeafletMouseEvent } from 'leaflet';

interface IPropsHighlightRegion {
	map: L.Map;
}
const HighlightRegion: React.FC<IPropsHighlightRegion> = ({ map }) => {
	//highlight region when hover
	const highlightFeature = (e: LeafletMouseEvent) => {
		const layer = e.target;

		layer.setStyle({
			weight: 5,
			color: '#666',
			dashArray: '',
			fillOpacity: 0.7,
		});
		layer.bringToFront();
	};

	const resetHighlight = (e: LeafletMouseEvent) => {
		L.geoJSON().resetStyle(e.target);
	};

	const onEachFeature = (feature: geojson.Feature, layer: Layer) => {
		layer.on({
			mouseover: highlightFeature,
			mouseout: resetHighlight,
		});
	};

	const addGeoJsonLayer = () => {
		let flag = false;
		map.eachLayer((layer) => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			if ((layer as any).defaultOptions?.onEachFeature) {
				flag = true;
			}
		});
		if (!flag) {
			L.geoJson(vnGeo, {
				onEachFeature: onEachFeature,
			}).addTo(map);
		}
	};

	addGeoJsonLayer();

	return null;
};

export default HighlightRegion;
