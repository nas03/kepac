import api from "@/helper/axios";
import { PrecipitationRecord } from "@/types";

export const getAvgPrecipitation = async (
  time: string,
): Promise<PrecipitationRecord[]> => {
  try {
    const response = await api.get("/precipitation/medium", {
      params: {
        time: time,
      },
    });
    return response.data.data;
  } catch {
    return [];
  }
};
