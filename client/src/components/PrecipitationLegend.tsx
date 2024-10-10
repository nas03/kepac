import { demoTime } from "@/data/time-demo.ts";
import {
	formatPrecipitation,
	formatToISOWithTimezone,
} from "@/helper/utils.ts";
import L from "leaflet";
import { useLayoutEffect } from "react";

interface IPropsPrecipitationLegend {
  map: L.Map;
  precipitation: number;
  time: number;
}
const PrecipitationLegend: React.FC<IPropsPrecipitationLegend> = ({
  map,
  precipitation,
  time,
}) => {
  const info = new L.Control({
    position: "topright",
  });
  useLayoutEffect(() => {
    info.onAdd = () => {
      const legend = document.querySelector(".legend") as HTMLElement;
      if (!legend) {
        const _div = L.DomUtil.create("div", "legend");
        _div.innerHTML = `
						<p>Date: ${formatToISOWithTimezone(demoTime[time / 2])}</p>
						<p>Precipitation: ${formatPrecipitation(precipitation)} </p>
					`;
        return _div;
      }
      return legend;
    };
    if (info) {
      info.addTo(map);
    }
  }, []);
  return null;
};

export default PrecipitationLegend;
