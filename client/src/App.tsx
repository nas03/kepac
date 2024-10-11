import { getRasterLayer } from "@/api/georaster.ts";
import {
  GeoTIFFLayer,
  HighlightRegion,
  InfoTip,
  RankInfo,
  TimeSlider,
} from "@/components";
import GradientScale from "@/components/GradientScale.tsx";
import { demoTime } from "@/data/time-demo.ts";
import { InfoOutlined } from "@mui/icons-material";
import { Button, Divider, Popover } from "antd";
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
import { RasterData } from "./types";

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
  const [toggle, setToggle] = useState({
    precipitation: true,
    warn: false,
  });
  const handleTimeChange = useCallback((newTime: number) => {
    setTime(newTime);
  }, []);
  const handleToggleLayer = useCallback(
    (newToggle: { precipitation?: boolean; warn?: boolean }) => {
      setToggle((prev) => ({ ...prev, ...newToggle }));
    },
    [],
  );
  // Memoized OverlayLayer to prevent re-renders from precipitation changes
  const OverlayLayer = memo(() => {
    const { time } = useContext(TimeContext)!;

    return (
      <div className="absolute z-[10000] ml-[1rem] mt-[5rem] max-h-[95vh]">
        <RankInfo toggle={toggle} onToggle={handleToggleLayer} time={time} />
      </div>
    );
  });

  const RightOverlayLayer = memo(() => {
    const Header = () => {
      return (
        <>
          <h1 className="text-xl font-bold">Chú thích</h1>
          <Divider className="mt-2" />
        </>
      );
    };
    return (
      <div className="absolute right-0 z-[10000] mr-[1rem] h-[95vh]">
        <div className="relative top-[4rem] float-right w-fit">
          <Popover
            content={<InfoTip />}
            style={{
              padding: "2rem",
            }}
            className="rounded-xl mt-[3rem]"
            title={<Header />}
            placement="left"
          >
            <Button
              type="default"
              className="rounded-full"
              icon={<InfoOutlined />}
            />
          </Popover>
        </div>
        <div className="relative top-[75%] float-right w-fit">
          <GradientScale toggle={toggle} />
        </div>
      </div>
    );
  });

  const External = () => {
    const map = useMap();
    const [rasterLayer, setRasterLayer] = useState<RasterData>({
      layer: null,
      georaster: null,
    });
    // const { setPrecipitation } = useContext(PrecipitationContext)!;
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
    useEffect(() => {
      if (!toggle.precipitation) {
        map.eachLayer((layer) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          if ((layer as any).rasters && (layer as any).georasters) {
            map.removeLayer(layer);
          }
        });
      }
      if (!toggle.warn) {
        console.log("delete");
        map.eachLayer((layer) => {
          if (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (layer as any).defaultOptions?.attribution === "highlightRegion"
          ) {
            map.removeLayer(layer);
          }
        });
      }
    }, [toggle]);
    return (
      <>
        <GeoTIFFLayer
          toggle={toggle.precipitation}
          map={map}
          georaster={rasterLayer}
        />

        {/* <PrecipitationLegend
          time={time}
          map={map}
          precipitation={precipitation}
        /> */}
        <HighlightRegion toggle={toggle.warn} time={time} map={map} />
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
