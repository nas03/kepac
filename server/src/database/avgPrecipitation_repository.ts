import db from "@/config/knex";
import { AvgPrecipitation } from "@/types";

export const getMedianPrecipitation = async (time: string) => {
  const query = await db("avg_precipitation")
    .select("*")
    .where({
      time: time,
    })
    .andWhere("avg_precipitation", ">", 0.2)
    .orderBy("avg_precipitation", "desc");
  return query;
};

export const uploadData = async (payload: AvgPrecipitation[]) => {
  const query = await db("avg_precipitation").insert(payload);
  if (!query) return false;
  return true;
};

export const getAvgPrecipitationByLocation = async (district_code: string) => {
  const query = await db("avg_precipitation")
    .select("*")
    .where({
      district_code: district_code,
    })
    .orderBy("time", "asc");
  return query;
};
