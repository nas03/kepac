import chroma from 'chroma-js';
import parseGeoraster from 'georaster';
import GeoRasterLayer from 'georaster-layer-for-leaflet';
import { useEffect } from 'react';

export function TifLayer(props: { url: string; map: L.Map }) {
	const { url, map } = props;

	useEffect(() => {
		const loadTiff = async () => {
			const response = await fetch('http://localhost:3000/api/geotiff');

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			// Read the response as an ArrayBuffer
			const arrayBuffer = await response.arrayBuffer();

			parseGeoraster(arrayBuffer).then((georaster) => {
				console.log({ georaster });
				const min = georaster.mins[0];
				const range = georaster.ranges[0];
				const scale = chroma.scale('Spectral').domain([1, 0]);
				const options = {
					pixelValuesToColorFn: function (pixelValues: number[]) {
						const pixelValue = pixelValues[0];
						if (pixelValue === 0) return null;
						if (pixelValue === -Infinity) return '#FF0000';
						if (pixelValue > 0) return '#0000FF';
					},
					resolution: 256,
					opacity: 1,
					georaster: undefined,
				};
				options.georaster = georaster;
				const layer = new GeoRasterLayer(options);
				layer.addTo(map);
				map.fitBounds(layer.getBounds());
			});
		};
		loadTiff();
	}, []); // I had changes to the context/map that were causing extra renders I didn't need

	return null;
}
