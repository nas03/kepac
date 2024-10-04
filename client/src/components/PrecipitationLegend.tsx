import L from 'leaflet';
import { useLayoutEffect } from 'react';

interface IPropsPrecipitationLegend {
	map: L.Map;
	precipitation: number;
}
const PrecipitationLegend: React.FC<IPropsPrecipitationLegend> = ({
	map,
	precipitation,
}) => {
	const info = new L.Control();
	info.setPosition('topright');

	useLayoutEffect(() => {
		info.onAdd = () => {
			const _div = L.DomUtil.create('div', 'legend');
			_div.innerHTML = `<p>Precipitation is ${precipitation} </p>`;
			return _div;
		};

		info.addTo(map);
	}, []);
	return null;
};

export default PrecipitationLegend;
