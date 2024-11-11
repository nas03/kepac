"use client";

import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import { createContext, memo, useCallback, useContext, useEffect, useState } from "react";
// Components
import { useMap } from "react-leaflet";
import {
  GeoTIFFLayer,
  GradientScale,
  HighlightRegion,
  InfoTip,
  Map,
  MarkerGroup,
  RankInfo,
  SetBoundsRectangles,
  TimeSlider
} from "./import";
// Data & Helpers
import { getRasterLayer } from "@/api/georaster";
import { demoTime } from "@/data/time-demo";
import { isHighlightLayer, isRasterLayer } from "@/helper/utils";
import type { ExternalProps, RasterData } from "@/types";
import { Divider, Popover } from "antd";
import { LatLngExpression } from "leaflet";

// Types

// const markerIcon = dynamic(() => import("@/components").then(mod => mod.markerIcon), { ssr: false });

// Context definitions
const TimeContext = createContext<{
  time: number;
  setTime: (value: number) => void;
} | null>(null);

const PrecipitationContext = createContext<{
  precipitation: number;
  setPrecipitation: (value: number) => void;
} | null>(null);

// External component with dynamic import
const External = dynamic(
  () => {
    const ExternalComponent = ({ toggle, setPredictData, setPosition }: ExternalProps) => {
      const map = useMap();
      const [rasterLayer, setRasterLayer] = useState<RasterData>({
        layer: null,
        georaster: null,
      });
      const { time } = useContext(TimeContext)!;

      useEffect(() => {
        getRasterLayer(demoTime[time]).then(setRasterLayer);
      }, [time]);

      useEffect(() => {
        map.eachLayer((layer) => {
          if (!toggle.precipitation && isRasterLayer(layer)) {
            map.removeLayer(layer);
          }
          if (!toggle.warn && isHighlightLayer(layer)) {
            map.removeLayer(layer);
          }
        });
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

    return Promise.resolve(ExternalComponent);
  },
  { ssr: false },
);

// Main component
const LeafletMap = () => {
  const [time, setTime] = useState(9);
  const [precipitation, setPrecipitation] = useState<number>(0);
  const [toggle, setToggle] = useState({
    precipitation: false,
    warn: true,
  });
  const [position, setPosition] = useState<LatLngExpression>([0, 0]);
  const [predictData, setPredictData] = useState<number[]>([]);
  const handleTimeChange = useCallback((newTime: number) => {
    setTime(newTime);
  }, []);

  const handleToggleLayer = useCallback(
    (newToggle: { precipitation?: boolean; warn?: boolean }) => {
      setToggle((prev) => ({ ...prev, ...newToggle }));
    },
    [],
  );

  // Overlay components
  const OverlayLayer = memo(() => {
    const { time } = useContext(TimeContext)!;

    return (
      <div className="absolute z-[10000] ml-[5rem] mt-[1rem]">
        <RankInfo toggle={toggle} onToggle={handleToggleLayer} time={time} />
      </div>
    );
  });
  OverlayLayer.displayName = "OverlayLayer";

  const RightOverlayLayer = memo(() => {
    const Header = () => (
      <>
        <h1 className="text-xl font-bold">Chú thích</h1>
        <Divider className="mt-2" />
      </>
    );

    return (
      <>
        <div className="absolute right-0 z-[10000] mr-[1rem] top-[4rem] float-right w-fit">
          <Popover
            content={<InfoTip />}
            style={{ padding: "2rem" }}
            className="mt-[3rem] rounded-xl"
            title={<Header />}
            placement="left"
          >
            {/* <button className="rounded-full" icon={<InfoOutlined />} /> */}
          </Popover>
        </div>

        <div className="absolute right-0 z-[10000] bottom-[10vh] mr-[1rem] w-fit">
          <GradientScale toggle={toggle} />
        </div>
      </>
    );
  });
  RightOverlayLayer.displayName = "RightOverlayLayer";

  return (
    <TimeContext.Provider value={{ time, setTime }}>
      <OverlayLayer />
      <RightOverlayLayer />
      <PrecipitationContext.Provider value={{ precipitation, setPrecipitation }}>
        <div className="flex flex-col w-screen h-screen">
          <div className="w-screen h-[90%]">
            <Map>
              <SetBoundsRectangles />
              <External toggle={toggle} setPosition={setPosition} setPredictData={setPredictData} />
              <MarkerGroup position={position} predictData={predictData} />
            </Map>
          </div>
          <TimeSlider onTimeChange={handleTimeChange} initialTime={time} />
        </div>
      </PrecipitationContext.Provider>
    </TimeContext.Provider>
  );
};

export default LeafletMap;
