import geojson from "geojson";
import React, { useEffect } from "react";
import { useMap } from "react-leaflet";

interface IZoomProps {
  zoom: string[];
}
const Zoom: React.FC<IZoomProps> = ({ zoom }) => {
  const map = useMap();

  useEffect(() => {
    map.eachLayer((layer) => {
      const layer_district = ((layer as L.GeoJSON).feature as geojson.Feature)?.properties?.District;
      const layer_province = ((layer as L.GeoJSON).feature as geojson.Feature)?.properties?.Province;
      if (layer_district === zoom[0] && layer_province === zoom[1]) {
        map.fitBounds((layer as L.GeoJSON).getBounds());
      }
    });
  }, [zoom, map]);
  return null;
};

export default Zoom;
