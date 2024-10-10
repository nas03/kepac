import { getAvgPrecipitation } from "@/api/precipitation.ts";
import { demoTime } from "@/data/time-demo.ts";
import { formatToDate } from "@/helper/utils.ts";
import { PrecipitationRecord } from "@/types";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { Button } from "antd";
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setFilteredData((prev) => filter);
  };
  useEffect(() => {
    getAvgPrecipitation(demoTime[time / 2]).then((data) => {
      setData(data);
      setFilteredData(data);
    });
  }, [time]);

  return (
    <>
      <div className="relative flex h-[80vh] max-w-[30rem] flex-col gap-5 bg-transparent">
        <div className="flex flex-row items-center gap-10">
          <div className="search-bar flex max-h-[3rem] flex-row items-center rounded-md bg-white p-1 text-black">
            <div className="flex flex-row items-center rounded-md px-3 py-2 hover:bg-slate-300 hover:text-blue-400">
              <SearchIcon className="h-full w-full text-xl" />
            </div>
            <input
              type="text"
              className="w-[15rem] bg-white pl-2 text-base focus:outline-none"
              placeholder="Tìm theo quận/huyện ..."
              onChange={(e) => filterData(e.target.value)}
            />
          </div>
          <div className="flex flex-row gap-2">
            <Button
              className={`rounded-3xl font-semibold hover:cursor-pointer ${toggle.warn ? "bg-[#0057FC] text-white" : "bg-white text-black"}`}
              onClick={() =>
                onToggle({ precipitation: toggle.warn, warn: !toggle.warn })
              }
            >
              Bản đồ cảnh báo
            </Button>
            <Button
              className={`rounded-3xl font-semibold hover:cursor-pointer ${toggle.precipitation ? "bg-[#0057FC] text-white" : "bg-white text-black"}`}
              onClick={() =>
                onToggle({
                  precipitation: !toggle.precipitation,
                  warn: toggle.precipitation,
                })
              }
            >
              Bản đồ mưa
            </Button>
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
                Xếp hạng theo quận ({formatToDate(demoTime[time / 2])})
              </h2>
            </AccordionSummary>
            <AccordionDetails>
              {/* Set a fixed height and enable scrolling here */}
              <div className="max-h-[70vh] overflow-y-auto max-2xl:max-h-[60vh]">
                <table className="min-w-full border-collapse">
                  <thead className="sticky top-0 bg-white text-sm">
                    <tr>
                      <th className="border-b-2 border-b-gray-100 p-4 text-left text-black">
                        #
                      </th>
                      <th className="border-b-2 border-b-gray-100 p-4 text-left uppercase text-black">
                        Địa điểm
                      </th>
                      <th className="border-b-2 border-b-gray-100 p-4 text-left font-sans uppercase text-black">
                        Lượng mưa
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((el, index) => (
                      <tr key={el.id}>
                        <td className="border-b-2 border-b-gray-100 p-4 text-xs font-semibold">
                          {index + 1}
                        </td>
                        <td className="border-b-2 border-b-gray-100 p-4 text-xs font-semibold">
                          {el?.district_name} - {el?.province_name}
                        </td>
                        <td className="border-b-2 border-b-gray-100 p-4 text-sm">
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
