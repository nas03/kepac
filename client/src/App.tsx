// CSS
import 'leaflet/dist/leaflet.css';
import './App.css';
// Libraries
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
// Components
import { fromArrayBuffer } from 'geotiff';
import L from 'leaflet';
import { useEffect } from 'react';
import { HighlightRegion } from './components';
import PrecipitationLegend from './components/PrecipitationLegend';

const GeoRasterLayer = () => {
	const map = useMap();

	useEffect(() => {
		const loadGeoTIFF = async () => {
			const response = await fetch('https://github.com/nas03/kepac/blob/main/client/src/assets/Radar_20201001000000.tif');
			const arrayBuffer = await response.arrayBuffer();
			const tiff = await fromArrayBuffer(arrayBuffer);
			const image = await tiff.getImage();
			const rasters = await image.readRasters();

			const bounds = [
				[image.getBoundingBox()[1], image.getBoundingBox()[0]],
				[image.getBoundingBox()[3], image.getBoundingBox()[2]],
			];

			const layer = L.imageOverlay.raster(rasters[0], bounds);
			layer.addTo(map);
		};

		loadGeoTIFF();
	}, [map]);

	return null;
};

const External = () => {
	const map = useMap();
	return (
		<>
			<PrecipitationLegend map={map} precipitation={3} />
			<HighlightRegion map={map} />
			{/* <TifLayer
				map={map}
				url="/Users/anhson/Downloads/DATA_SV/Precipitation/Radar/2020/10/01/Radar_20201001000000.tif"
			/> */}
			<GeoRasterLayer />
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
