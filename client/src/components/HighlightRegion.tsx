import { getAvgPrecipitation } from "@/api";
import { vnDistrict } from "@/data/district";
import { demoTime } from "@/data/time-demo";
import { PrecipitationRecord } from "@/types";
import geojson, { FeatureCollection } from "geojson";
import L from "leaflet";
import { useEffect, useState } from "react";
interface IPropsHighlightRegion {
  map: L.Map;
  time: number;
  toggle: boolean;
}
const HighlightRegion: React.FC<IPropsHighlightRegion> = ({
  map,
  time,
  toggle,
}) => {
  const [data, setData] = useState<PrecipitationRecord[]>([]);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      const data = await getAvgPrecipitation(demoTime[time / 2]);
      if (isMounted) {
        setData(data);
      }
    };
    fetchData();

    return () => {
      isMounted = false;
    };
  }, [time]);
  function getColor(d: string) {
    if (data.length === 0) return null;
    const precipitation = data.find(
      (el) => el.district_code === d,
    )?.avg_precipitation;

    console.log({ precipitation });
    if (!precipitation || precipitation < 0.2) return null;
    if (precipitation <= 1) return "#3a92a1";
    if (precipitation <= 5) return "#49a43a";
    if (precipitation <= 30) return "#993839";
    if (precipitation > 30) return "#a33782";
  }

  function style(feature: geojson.Feature | undefined) {
    const color = getColor(feature?.properties?.District);
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
    }).addTo(map);
  };

  addGeoJsonLayer();

  return null;
};

export default HighlightRegion;
