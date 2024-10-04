import chroma from 'chroma-js';
import parseGeoraster from 'georaster';
import GeoRasterLayer from 'georaster-layer-for-leaflet';
import { useEffect } from 'react';

export function TifLayer(props: { url: string; map: L.Map }) {
	const { url, map } = props;

	useEffect(() => {
		fetch(url, {
			mode: 'no-cors',
		})
			.then((response) => response.arrayBuffer())
			.then((arrayBuffer) => {
				parseGeoraster(arrayBuffer).then((georaster) => {
					console.log({ georaster });
					const min = georaster.mins[0];
					const range = georaster.ranges[0];
					const scale = chroma.scale('Spectral').domain([1, 0]);
					const options = {
						pixelValuesToColorFn: function (pixelValues: number[]) {
							const pixelValue = pixelValues[0];
							if (pixelValue === 0) return null;
							const scaledPixelValue = (pixelValue - min) / range;
							const color = scale(scaledPixelValue).hex();
							return color;
						},
						resolution: 256,
						opacity: 0.7,
						georaster: undefined,
					};
					options.georaster = georaster;
					const layer = new GeoRasterLayer(options);
					layer.addTo(map);
					map.fitBounds(layer.getBounds());
				});
			});
	}, [url]); // I had changes to the context/map that were causing extra renders I didn't need

	return null;
}
