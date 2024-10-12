import L from "leaflet";
import "leaflet/dist/leaflet.css";
import React from "react";
import { useMap } from "react-leaflet";

const SetBoundsRectangles = () => {
  const map = useMap();

  React.useEffect(() => {
    // Set max bounds
    const southWest = L.latLng(8.18, 102.14);
    const northEast = L.latLng(23.39, 109.46);
    const bounds = L.latLngBounds(southWest, northEast);

    map.setMaxBounds(bounds);
    map.on("drag", () => {
      map.panInsideBounds(bounds, { animate: false });
    });

    // Set zoom limits
    map.setMinZoom(5);
    map.setMaxZoom(18);
  }, [map]);

  return null;
};

export default SetBoundsRectangles;
