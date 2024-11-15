import fs from "fs";
import { Client } from "pg";
export const getFilename = (path: string) => {
  const buffer = String(path).split("/");
  return buffer[buffer.length - 1];
};

export const use = (fn: Function) => (req: any, res: any, next: any) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export const getTimeInfoFromFilename = (filename: string) => {
  const parts = filename.split("_")[1];
  return new Date(
    parseInt(parts.slice(0, 4)), // year
    parseInt(parts.slice(4, 6)) - 1, // month (0-indexed)
    parseInt(parts.slice(6, 8)), // day
    parseInt(parts.slice(8, 10)), // hour
    parseInt(parts.slice(10, 12)), // minute
    parseInt(parts.slice(12, 14)) // second
  );
};

import { AvgPrecipitation } from "@/types";
import { exec } from "child_process";
import path from "path";

// Convert .tif file to PostgreSQL query file
export const convertToSQL = (inputFile: string, outputFile: string) => {
  try {
    const tableName = "raster_table";

    const command = `raster2pgsql -s SRID -I -C ${inputFile} public.${tableName} > ${outputFile}`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing command: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Error: ${stderr}`);
      }
      console.log(`SQL file generated at ${outputFile}`);
    });
  } catch (error) {
    console.log(error);
  }
};

// convertToSQL(
// 	'/Users/anhson/Downloads/DATA_SV/Precipitation/Radar/2020/10/01/Radar_20201001230000.tif',
// 	'assets/sql/output.sql'
// );

// Execute PostgreSQL execution file
async function executeSqlFile(filePath: string) {
  try {
    const client = new Client({
      user: "postgres",
      host: "localhost",
      database: "air_quality",
      password: "",
      port: 5432,
    });

    try {
      await client.connect();
      const sql = fs.readFileSync(path.resolve(filePath), "utf8");
      await client.query(sql);
      console.log("SQL file executed successfully");
    } catch (error) {
      console.error("Error executing SQL file:", error);
    } finally {
      await client.end();
    }
  } catch (error) {
    console.log(error);
  }
}

export const removeVietnameseAccents = (str: string) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
};

export const timeToFilename = (time: string) => {
  // Time: 2020-10-01 02:00:00.000000
  // Filename: Radar_20201001000000.tif
  let filename = "Radar_";
  const [date, hour] = time.split(" ");
  filename += date.replaceAll("-", "");
  filename += hour.split(".")[0].replaceAll(":", "");
  return filename + ".tif";
};

export const redisKey = (keys: string[]) => {
  return keys.join(":");
};
export const getHour = (time: Date) => {
  return Number(time.toTimeString().split(" ")[0].split(":")[0]);
};
export const sanitizeData = (data: AvgPrecipitation[]) => {
  const hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  const result: any[] = [];
  const dummyData = { ...data[0] };
  hours.forEach((hour) => {
    const temp = data.find((el) => getHour(el.time) === hour);
    temp ? result.push(temp) : result.push({ ...dummyData, time: hour, avg_precipitation: 0 });
  });
  return result;
};
