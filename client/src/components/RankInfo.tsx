import { getAvgPrecipitation } from "@/api/precipitation.ts";
import { demoTime } from "@/data/time-demo.ts";
import { formatToDate } from "@/helper/utils.ts";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import React, { useEffect, useState } from "react";

type PrecipitationRecord = {
  id: number;
  district_id: number;
  avg_precipitation: number;
  geo_id: string;
  district_name: string;
  geo_type: string;
  time: string;
  updated_at: Date | null;
  created_at: Date | null;
};

interface IPropsRankInfo {
  time: number;
}
const RankInfo: React.FC<IPropsRankInfo> = ({ time }) => {
  const [data, setData] = useState<PrecipitationRecord[]>([]);
  const [filteredData, setFilteredData] = useState<PrecipitationRecord[]>(data);

  const filterData = (input: string) => {
    const filter = data.filter((el) => el.district_name.startsWith(input));
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
      <div className="relative mt-[5rem] flex h-[80vh] max-w-[30rem] flex-col gap-5 bg-transparent">
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
              <div className="max-h-[20rem] overflow-y-auto">
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
                          {el?.district_name}
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
