import api from "@/helper/axios";

type PrecipitationRecord = {
  id: number;
  district_id: number;
  avg_precipitation: number;
  geo_id: string;
  district_name: string;
  geo_type: string;
  time: string; // You might also consider using Date if you parse the date
  updated_at: Date | null; // Assuming updated_at can be a Date or null
  created_at: Date | null; // Assuming created_at can be a Date or null
};
 
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return [];
  }
};
