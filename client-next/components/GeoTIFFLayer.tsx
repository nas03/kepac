'use client';
import GeoRasterLayer from "georaster-layer-for-leaflet";
import { useEffect } from "react";
interface IPropsGeoTIFFLayer {
  map: L.Map;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  georaster: any;
  toggle: boolean;
}
const GeoTIFFLayer: React.FC<IPropsGeoTIFFLayer> = ({
  map,
  georaster,
  toggle,
}) => {
  const clearPreviousLayer = (map: L.Map) => {
    map.eachLayer((layer) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((layer as any).rasters && (layer as any).georasters) {
        map.removeLayer(layer);
      }
    });
  };

  useEffect(() => {
    clearPreviousLayer(map);
    if (!toggle || !georaster?.layer) return;

    const layer = new GeoRasterLayer(georaster.layer);
    map.addLayer(layer);
    map.fitBounds(layer.getBounds());

    return () => {
      map.removeLayer(layer);
    };
  }, [georaster, toggle]);

  return null;
};

export default GeoTIFFLayer;
