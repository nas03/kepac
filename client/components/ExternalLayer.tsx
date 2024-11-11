"use client";

import { getRasterLayer } from "@/api";
import { TimeContext } from "@/context/context";
import { demoTime } from "@/data/time-demo";
import { isHighlightLayer, isRasterLayer } from "@/helper/utils";
import { RasterData } from "@/types";
import { LatLngExpression } from "leaflet";
import { useContext, useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import GeoTIFFLayer from "./GeoTIFFLayer";
import HighlightRegion from "./HighlightRegion";

interface IExternalLayerProps {
  toggle: {
    precipitation: boolean;
    warn: boolean;
  };
  setPredictData: (data: number[]) => void;
  setPosition: (data: LatLngExpression) => void;
}

const ExternalLayer: React.FC<IExternalLayerProps> = ({ toggle, setPredictData, setPosition }) => {
  const map = useMap();
  const { time } = useContext(TimeContext)!;
  const [rasterLayer, setRasterLayer] = useState<RasterData>({
    layer: null,
    georaster: null,
  });

  useEffect(() => {
    getRasterLayer(demoTime[time]).then(setRasterLayer);

    const cleanup = () => {
      map.eachLayer((layer) => {
        if (isRasterLayer(layer)) {
          map.removeLayer(layer);
        }
      });
    };

    return cleanup;
  }, [time, map]);

  useEffect(() => {
    const cleanup = () => {
      map.eachLayer((layer) => {
        if (!toggle.precipitation && isRasterLayer(layer)) {
          map.removeLayer(layer);
        }
        if (!toggle.warn && isHighlightLayer(layer)) {
          map.removeLayer(layer);
        }
      });
    };

    cleanup();

    return () => {
      map.eachLayer((layer) => {
        if (isRasterLayer(layer) || isHighlightLayer(layer)) {
          map.removeLayer(layer);
        }
      });
    };
  }, [toggle, map]);

  return (
    <>
      <GeoTIFFLayer toggle={toggle.precipitation} map={map} georaster={rasterLayer} />
      <HighlightRegion
        toggle={toggle.warn}
        setPosition={setPosition}
        setPredictData={setPredictData}
        time={time}
        map={map}
      />
    </>
  );
};

export default ExternalLayer;
