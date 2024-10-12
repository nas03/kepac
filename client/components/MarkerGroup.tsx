import L from 'leaflet';
import { Marker, Tooltip } from 'react-leaflet';
const MarkerGroup = () => {
	const createTransparentIcon = (
		color = '#1e90ff',
		borderColor = '#ffffff'
	) => {
		return L.divIcon({
			html: `
<svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
<circle cx="15" cy="15" r="12" fill="${color}" fill-opacity="0.5" stroke="${borderColor}" stroke-width="2"/>
</svg>
`,
			className: 'transparent-icon',
			iconSize: [30, 30],
			iconAnchor: [15, 15],
		});
	};

	return (
		<>
			<Marker position={[16.5, 112.0]} icon={createTransparentIcon()}>
				<Tooltip direction="center" offset={[0, 20]} opacity={1} permanent>
					Quần đảo Hoàng Sa
				</Tooltip>
			</Marker>
			<Marker position={[10.0, 114.0]} icon={createTransparentIcon()}>
				<Tooltip direction="center" offset={[0, 20]} opacity={1} permanent>
					Quần đảo Trường Sa
				</Tooltip>
			</Marker>
		</>
	);
};

export default MarkerGroup;
