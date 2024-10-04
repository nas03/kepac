// CSS
import 'leaflet/dist/leaflet.css';
import './App.css';
// Libraries
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
// Components
import {
	GeoTIFFLayer,
	HighlightRegion,
	PrecipitationLegend,
} from '@/components';

const External = () => {
	const map = useMap();
	return (
		<>
			<PrecipitationLegend map={map} precipitation={3} />
			<HighlightRegion map={map} />
			<GeoTIFFLayer map={map} />
		</>
	);
};

const LeafletMap = () => {
	const latitude = 17.9459;
	const longitude = 105.97;
	// const position: LatLngExpression = [17.9459, 105.97];

	return (
		// Make sure you set the height and width of the map container otherwise the map won't show
		<MapContainer
			center={[latitude, longitude]}
			zoom={7}
			style={{ height: '100vh', width: '100vw' }}>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{/* <Marker position={position}>
				<Popup>
					A pretty CSS3 popup. <br /> Easily customizable.
				</Popup>
			</Marker> */}
			<External />
		</MapContainer>
	);
};

export default LeafletMap;
