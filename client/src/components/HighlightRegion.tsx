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
	L.geoJson(vnGeo, {
		onEachFeature: onEachFeature,
	}).addTo(map);

	return null;
};

export default HighlightRegion;
