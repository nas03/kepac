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
	TimeSlider,
} from '@/components';
import { useCallback, useState } from 'react';

const LeafletMap = () => {
	const latitude = 17.9459;
	const longitude = 105.97;

	const [time, setTime] = useState(0);
	const [precipitation, setPrecipitation] = useState<number>(0);
	const handleTimeChange = useCallback((newTime: number) => {
		setTime(newTime);
	}, []);
	const handlePrecipitationChange = useCallback((newPrecipitation: number) => {
		setPrecipitation(Number(newPrecipitation));
	}, []);
	const External = () => {
		const map = useMap();
		return (
			<>
				<GeoTIFFLayer
					time={time}
					map={map}
					onPrecipitationChange={handlePrecipitationChange}
				/>
				<PrecipitationLegend
					time={time}
					map={map}
					precipitation={precipitation}
				/>
				<HighlightRegion map={map} />
			</>
		);
	};

	return (
		<>
			<MapContainer
				center={[latitude, longitude]}
				zoom={7}
				style={{ width: '100vw', height: '98vh' }}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<External />
			</MapContainer>
			<TimeSlider onTimeChange={handleTimeChange} initialTime={time} />
		</>
	);
};

export default LeafletMap;
