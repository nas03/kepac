import { getAvgPrecipitation } from "@/api/precipitation.ts";
import { demoTime } from "@/data/time-demo.ts";
import { formatToDate } from "@/helper/utils.ts";
import { PrecipitationRecord } from "@/types";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
// import { Button } from "antd";
import React, { useEffect, useState } from "react";

interface IPropsRankInfo {
  time: number;
  onToggle: (newToggle: { precipitation?: boolean; warn?: boolean }) => void;
  toggle: {
    precipitation: boolean;
    warn: boolean;
  };
}
const RankInfo: React.FC<IPropsRankInfo> = ({ time, onToggle, toggle }) => {
  const [data, setData] = useState<PrecipitationRecord[]>([]);
  const [filteredData, setFilteredData] = useState<PrecipitationRecord[]>(data);

  const filterData = (input: string) => {
    const filter = data.filter((el) => el.district_name.startsWith(input));

    setFilteredData(() => filter);
  };
  useEffect(() => {
    getAvgPrecipitation(demoTime[time]).then((data) => {
      setData(data);
      setFilteredData(data);
    });
  }, [time]);

  return (
    <>
      <div className="relative flex max-h-[80vh] max-w-[30rem] flex-col gap-5 bg-transparent">
        <div className="flex flex-row items-center gap-10">
          <div className="search-bar flex h-[3rem] flex-row items-center rounded-md pl-1 bg-white p-1 text-black">
            <div className="flex flex-row items-center rounded-md p-1 justify-center hover:bg-slate-300 hover:text-blue-400">
              <SearchIcon className="h-full" />
            </div>
            <input
              type="text"
              className="w-[15rem] bg-white pl-2 text-base focus:outline-none"
              placeholder="Tìm theo quận/huyện ..."
              onChange={(e) => filterData(e.target.value)}
            />
          </div>
          <div className="flex flex-row gap-2">
            <button
              className={`border-2 border-slate-200 text-sm px-3 py-1 max-h-fit min-w-fit rounded-3xl font-semibold hover:cursor-pointer ${toggle.warn ? "bg-[#0057FC] text-white" : "bg-white text-black"}`}
              onClick={() => onToggle({ precipitation: toggle.warn, warn: !toggle.warn })}
            >
              Bản đồ cảnh báo
            </button>
            <button
              className={`border-2 border-slate-200 text-sm px-3 py-1 max-h-fit min-w-fit rounded-3xl font-semibold hover:cursor-pointer ${toggle.precipitation ? "bg-[#0057FC] text-white" : "bg-white text-black"}`}
              onClick={() =>
                onToggle({
                  precipitation: !toggle.precipitation,
                  warn: toggle.precipitation,
                })
              }
            >
              Bản đồ mưa
            </button>
          </div>
        </div>
        <div>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <h2 className="text-center font-bold uppercase">
                Xếp hạng theo quận ({formatToDate(demoTime[time])})
              </h2>
            </AccordionSummary>
            <AccordionDetails>
              {/* Set a fixed height and enable scrolling here */}
              <div className="max-h-[70vh] overflow-y-auto max-2xl:max-h-[60vh]">
                <table className="min-w-full border-collapse">
                  <thead className="sticky top-0 bg-white text-sm">
                    <tr>
                      <th className="border-b-2 border-b-gray-100 p-2 text-left text-black">#</th>
                      <th className="border-b-2 border-b-gray-100 p-2 text-left uppercase text-black">
                        Địa điểm
                      </th>
                      <th className="border-b-2 border-b-gray-100 p-2 text-left uppercase text-black">
                        Tỉnh
                      </th>
                      <th className="border-b-2 border-b-gray-100 p-2 text-left font-sans uppercase text-black">
                        Lượng mưa
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((el, index) => (
                      <tr key={el.id}>
                        <td className="w-fit border-b-2 border-b-gray-100 p-3 text-xs font-semibold">
                          {index + 1}
                        </td>
                        <td className="w-fit border-b-2 border-b-gray-100 p-3 text-left  text-xs font-semibold">
                          {el?.district_name}
                        </td>
                        <td className="w-fit border-b-2 border-b-gray-100 p-3 text-left text-xs font-semibold">
                          {el?.province_name}
                        </td>
                        <td className="w-fit border-b-2 border-b-gray-100 p-3 text-sm">
                          {Number(el?.avg_precipitation).toFixed(2)} mm
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default RankInfo;
