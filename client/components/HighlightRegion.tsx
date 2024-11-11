import { getAvgPrecipitation, getAvgPrecipitationByLocation } from "@/api";
import { vnDistrict } from "@/data/district";
import { demoTime } from "@/data/time-demo";
import { removeVietnameseAccents } from "@/helper/utils";
import { PrecipitationRecord } from "@/types";
import geojson, { FeatureCollection } from "geojson";
import L, { LatLngExpression } from "leaflet";
import { useEffect, useState } from "react";
interface IPropsHighlightRegion {
  map: L.Map;
  time: number;
  toggle: boolean;
  setPredictData: (data: number[]) => void;
  setPosition: (data: LatLngExpression) => void;
}
const HighlightRegion: React.FC<IPropsHighlightRegion> = ({
  map,
  time,
  toggle,
  setPredictData,
  setPosition,
}) => {
  const [data, setData] = useState<PrecipitationRecord[]>([]);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      const data = await getAvgPrecipitation(demoTime[time]);
      if (isMounted) {
        setData(data);
      }
    };
    fetchData();

    return () => {
      isMounted = false;
    };
  }, [time]);
  function getColor(district: string, province: string) {
    if (data.length === 0) return null;
    const precipitation = data.find(
      (el) =>
        el.district_code === district && removeVietnameseAccents(el.province_name) === province,
    )?.avg_precipitation;

    if (!precipitation || precipitation <= 0.2) return null;
    if (precipitation <= 1) return "#3a92a1";
    if (precipitation <= 5) return "#49a43a";
    if (precipitation <= 30) return "#993839";
    if (precipitation > 30) return "#a33782";
  }

  const showDiagram = async (e: L.LeafletMouseEvent, layer: L.GeoJSON) => {
    if ((layer.feature as geojson.Feature)?.properties === null) {
      return null;
    }
    /* Zoom to location */
    map.fitBounds(e.target.getBounds());

    const district_code = (layer.feature as geojson.Feature)?.properties?.District;
    const province = (layer.feature as geojson.Feature)?.properties?.Province;
    const predictedPrecipitation = await getAvgPrecipitationByLocation({
      district_code: district_code,
      province: province,
    });
    setPredictData(predictedPrecipitation);
    setPosition([e.latlng.lat, e.latlng.lng]);
    return null;
  };

  function onFeature(feature: geojson.Feature, layer: L.GeoJSON) {
    // layer.addEventListener("click", () => showDiagram(feature, layer));
    layer.on({
      click: (e) => showDiagram(e, layer),
    });
  }

  function style(feature: geojson.Feature | undefined) {
    const color = getColor(feature?.properties?.District, feature?.properties?.Province);
    if (!color) {
      return {
        weight: 0,
        opacity: 1,
        color: "white",
        dashArray: "0",
        fillOpacity: 0,
        fillColor: "transparent",
      };
    }
    return {
      weight: 2,
      color: "white",
      dashArray: "3",
      fillOpacity: 0.5,
      fillColor: color,
    };
  }

  const addGeoJsonLayer = () => {
    map.eachLayer((layer) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((layer as any).defaultOptions?.attribution === "highlightRegion") {
        map.removeLayer(layer);
      }
    });
    if (!toggle) {
      return null;
    }
    L.geoJson(vnDistrict as FeatureCollection, {
      style: style,
      attribution: "highlightRegion",
      onEachFeature: onFeature,
    }).addTo(map);
  };

  addGeoJsonLayer();

  return null;
};

export default HighlightRegion;
