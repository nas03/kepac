import { getRasterLayer } from "@/api/georaster.ts";
import { GeoTIFFLayer, InfoTip, RankInfo, TimeSlider } from "@/components";
import GradientScale from "@/components/GradientScale.tsx";
import { demoTime } from "@/data/time-demo.ts";
import { InfoOutlined } from "@mui/icons-material";
import { Button, Popover } from "antd";
import "leaflet/dist/leaflet.css";
import {
  createContext,
  memo,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "./App.css";

// Separate contexts for different state values
const TimeContext = createContext<{
  time: number;
  setTime: (value: number) => void;
} | null>(null);

const PrecipitationContext = createContext<{
  precipitation: number;
  setPrecipitation: (value: number) => void;
} | null>(null);

const LeafletMap = () => {
  const latitude = 17.9459;
  const longitude = 105.97;

  const [time, setTime] = useState(0);
  const [precipitation, setPrecipitation] = useState<number>(0);

  const handleTimeChange = useCallback((newTime: number) => {
    setTime(newTime);
  }, []);

  // Memoized OverlayLayer to prevent re-renders from precipitation changes
  const OverlayLayer = memo(() => {
    const { time } = useContext(TimeContext)!;

    return (
      <div className="absolute z-[10000] ml-[1rem] h-[95vh]">
        <RankInfo time={time} />
      </div>
    );
  });

  const RightOverlayLayer = memo(() => {
    const content = (
      <div>
        <p>Content</p>
        <p>Content</p>
      </div>
    );
    return (
      <div className="absolute right-0 z-[10000] mr-[1rem] h-[95vh]">
        {/* <div className="relative top-[4rem] flex h-[2.3rem] w-[2.3rem] flex-row items-center justify-center rounded-full bg-transparent bg-white text-lg text-black hover:cursor-pointer hover:text-blue-400"> */}
        <div className="relative top-[4rem] float-right w-fit">
          <Popover content={<InfoTip />} title="Title" placement="left">
            <Button
              type="default"
              className="rounded-full"
              icon={<InfoOutlined />}
            />
          </Popover>
        </div>
        <div className="relative top-[65vh] float-right w-full">
          <GradientScale />
        </div>
        {/* <InfoOutlinedIcon className="h-full w-full" /> */}
        {/* </div> */}
      </div>
    );
  });

  const External = () => {
    const map = useMap();
    const [rasterLayer, setRasterLayer] = useState<any>(null);
    const { setPrecipitation } = useContext(PrecipitationContext)!;
    const { time } = useContext(TimeContext)!;

    useEffect(() => {
      getRasterLayer(demoTime[time / 2]).then((rasterLayer) => {
        setRasterLayer(rasterLayer);
      });
    }, [time]);

    // useEffect(() => {
    //   if (!map || !rasterLayer?.georaster) return;

    //   const handleClick = (e: L.LeafletMouseEvent) => {
    //     const latlng = e.latlng;
    //     const data = geoblaze.identify(rasterLayer.georaster, [
    //       latlng.lng,
    //       latlng.lat,
    //     ]);
    //     setPrecipitation(Number(data));
    //   };

    //   map.on("click", handleClick);

    //   return () => {
    //     map.off("click", handleClick);
    //   };
    // }, [map, rasterLayer, setPrecipitation]);

    return (
      <>
        <GeoTIFFLayer map={map} georaster={rasterLayer} />
        {/* <PrecipitationLegend
          time={time}
          map={map}
          precipitation={precipitation}
        /> */}
        {/* <HighlightRegion map={map} /> */}
      </>
    );
  };

  return (
    <TimeContext.Provider value={{ time, setTime }}>
      <OverlayLayer />
      <RightOverlayLayer />
      <PrecipitationContext.Provider
        value={{ precipitation, setPrecipitation }}
      >
        <MapContainer
          center={[latitude, longitude]}
          zoom={7}
          style={{ width: "100vw", height: "95vh" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <External />
        </MapContainer>
        <TimeSlider onTimeChange={handleTimeChange} initialTime={time} />
      </PrecipitationContext.Provider>
    </TimeContext.Provider>
  );
};

export default LeafletMap;
