import GeoRasterLayer from "georaster-layer-for-leaflet";
import { useEffect } from "react";
interface IPropsGeoTIFFLayer {
  map: L.Map;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  georaster: any;
}
const GeoTIFFLayer: React.FC<IPropsGeoTIFFLayer> = ({ map, georaster }) => {
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

    if (!georaster?.layer) {
      return;
    }
    const layer = new GeoRasterLayer(georaster?.layer);

    map.addLayer(layer);
    map.fitBounds(layer.getBounds());
  }, [georaster]);

  return null;
};

export default GeoTIFFLayer;
