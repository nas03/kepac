import { axisClasses, BarChart } from "@mui/x-charts";
import L, { LatLngExpression } from "leaflet";
import { Marker, Popup, Tooltip } from "react-leaflet";

interface IPropsMarkerGroupProps {
  position: LatLngExpression;
  predictData: number[];
}
const MarkerGroup: React.FC<IPropsMarkerGroupProps> = ({ position, predictData }) => {
  const createTransparentIcon = (color = "#1e90ff") => {
    return L.divIcon({
      html: `
<svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
<circle cx="15" cy="15" r="12" fill="${color}" fill-opacity="0"/>
</svg>
`,
      className: "transparent-icon",
      iconSize: [30, 30],
      iconAnchor: [15, 15],
    });
  };

  return (
    <>
      <Marker position={[16.5, 112.0]} icon={createTransparentIcon()}>
        <Tooltip direction="center" offset={[0, 20]} opacity={1} permanent>
          Quần đảo Hoàng Sa
        </Tooltip>
      </Marker>
      <Marker position={[10.0, 114.0]} icon={createTransparentIcon()}>
        <Tooltip direction="center" offset={[0, 20]} opacity={1} permanent>
          Quần đảo Trường Sa
        </Tooltip>
      </Marker>
      <Marker
        position={position}
        icon={L.icon({
          iconUrl: "location_ico.png",
          iconSize: [41, 41],
          iconAnchor: [12, 41],
        })}
      >
        <Popup className="bg-transparent w-[800px] h-[300]">
          <h3 className="font-semibold text-lg text-center w-[800px]">Rainfall Forecast Chart</h3>
          <BarChart
            xAxis={[
              {
                scaleType: "band",
                data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((el) =>
                  el === 9
                    ? `${el.toString().padStart(2, "0")}:00 \n (Now)`
                    : `${el.toString().padStart(2, "0")}:00`,
                ),
                colorMap: {
                  type: "ordinal",
                  colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((el) =>
                    el > 9 ? "#08589e" : '#4eb3d3',
                  ),
                },
              },
            ]}
            series={[
              {
                data: predictData,
                highlightScope: {
                  highlight: "item",
                  fade: "global",
                },
                valueFormatter: (value) => {
                  return (value !== null && value > 0) ? `${value.toFixed(3)} mm` : "0 mm";
                },
              },
            ]}
            highlightedItem={{
              dataIndex: 2,
            }}
            sx={{
              [`& .${axisClasses.left} .${axisClasses.label}`]: {
                transform: "translateX(-10px)",
              },
            }}
            yAxis={[{ label: "Rainfall (mm)" }]}
            width={800}
            height={300}
            className="z-[100000]"
          />
        </Popup>
      </Marker>
    </>
  );
};

export default MarkerGroup;
