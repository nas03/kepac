import api from "@/helper/axios";
import { PrecipitationRecord } from "@/types";

export const getAvgPrecipitation = async (time: string): Promise<PrecipitationRecord[]> => {
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

export const getAvgPrecipitationByLocation = async ({
  district_code,
  province,
}: {
  district_code: string;
  province: string;
}): Promise<number[]> => {
  try {
    const response = await api.get(`/precipitation/district`, {
      params: {
        district_code: district_code,
        province: province,
      },
    });
    const data = (response.data.data as PrecipitationRecord[]).map(
      (record) => record.avg_precipitation,
    );
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
