"use client";
// Library
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useCallback, useState } from "react";
// Components
// import { MapContainer } from "react-leaflet";

import { PrecipitationContext, TimeContext } from "@/context/context";
import {
  ExternalLayer,
  MapContainer,
  // /* MapContainer, */
  MarkerGroup,
  RightOverlayLayer,
  TileLayer,
  TimeSlider,
  Zoom,
} from "./import";

// Main component
const LeafletMap = () => {
  const [time, setTime] = useState(9);
  const [precipitation, setPrecipitation] = useState<number>(0);
  const [position, setPosition] = useState<LatLngExpression>([0, 0]);
  const [predictData, setPredictData] = useState<number[]>([]);
  const [zoom, setZoom] = useState<string[]>(["", ""]);
  const [toggle, setToggle] = useState({
    precipitation: false,
    warn: true,
  });

  const setZoomPosition = useCallback((district: string, province: string) => {
    console.log(district, province);
    setZoom([district, province]);
  }, []);
  const handleTimeChange = useCallback((newTime: number) => {
    setTime(newTime);
  }, []);

  const handleToggleLayer = useCallback((newToggle: Partial<typeof toggle>) => {
    setToggle((prev) => ({ ...prev, ...newToggle }));
  }, []);

  return (
    <TimeContext.Provider value={{ time, setTime }}>
      <RightOverlayLayer setZoomPosition={setZoomPosition} toggle={toggle} handleToggleLayer={handleToggleLayer} />
      <PrecipitationContext.Provider value={{ precipitation, setPrecipitation }}>
        <div className="flex flex-col w-screen h-screen">
          <div className="w-screen h-[90%]">
            <MapContainer
              preferCanvas={true}
              center={[17.9459, 105.97]}
              zoom={7}
              style={{
                width: "100vw",
                height: "100%",
              }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Zoom zoom={zoom} />
              {/* <SetBoundsRectangles /> */}
              <ExternalLayer toggle={toggle} setPosition={setPosition} setPredictData={setPredictData} />
              <MarkerGroup position={position} predictData={predictData} />
            </MapContainer>
          </div>
          <TimeSlider onTimeChange={handleTimeChange} initialTime={time} />
        </div>
      </PrecipitationContext.Provider>
    </TimeContext.Provider>
  );
};

export default LeafletMap;
