import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const Comp = () => {
	const map = useMap();
	const legend = L.control().setPosition();

	legend.onAdd = () => {
		const div = L.DomUtil.create('div', 'info legend');
		div.innerHTML =
			'<h4>This is the legend</h4>' +
			'<b>Lorem ipsum dolor sit amet consectetur adipiscing</b>';
		return div;
	};

	legend.addTo(map);
	return null;
};
const SimpleMap = () => {
	const mapRef = useRef(null);
	const latitude = 17.9459;
	const longitude = 105.97;
	const position = [17.9459, 105.97];

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
			<Marker position={position}>
				<Popup>
					A pretty CSS3 popup. <br /> Easily customizable.
				</Popup>
			</Marker>
			{/* <Comp /> */}
			{/* Additional map layers or components can be added here */}
		</MapContainer>
	);
};

export default SimpleMap;
