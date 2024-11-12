"use client";
// Library
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useCallback, useState } from "react";
// Components
import { MapContainer } from "react-leaflet";
import {
  ExternalLayer,
  // MapContainer,
  MarkerGroup,
  RightOverlayLayer,
  TileLayer,
  TimeSlider
} from "./import";
// Context
import { PrecipitationContext, TimeContext } from "@/context/context";

// Main component
const LeafletMap = () => {
  const [time, setTime] = useState(9);
  const [precipitation, setPrecipitation] = useState<number>(0);
  const [position, setPosition] = useState<LatLngExpression>([0, 0]);
  const [predictData, setPredictData] = useState<number[]>([]);
  const [toggle, setToggle] = useState({
    precipitation: false,
    warn: true,
  });

  const handleTimeChange = useCallback((newTime: number) => {
    setTime(newTime);
  }, []);

  const handleToggleLayer = useCallback((newToggle: Partial<typeof toggle>) => {
    setToggle((prev) => ({ ...prev, ...newToggle }));
  }, []);

  return (
    <TimeContext.Provider value={{ time, setTime }}>
      <RightOverlayLayer toggle={toggle} handleToggleLayer={handleToggleLayer} />
      <PrecipitationContext.Provider value={{ precipitation, setPrecipitation }}>
        <div className="flex flex-col w-screen h-screen">
          <div className="w-screen h-[90%]">
            <MapContainer
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
              {/* <SetBoundsRectangles /> */}
              <ExternalLayer
                toggle={toggle}
                setPosition={setPosition}
                setPredictData={setPredictData}
              />
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
