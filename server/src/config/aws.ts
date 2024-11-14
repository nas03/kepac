import { GetObjectCommandOutput, S3 } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
dotenv.config();
const s3Client = new S3({
  region: "ap-southeast-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY || "",
    secretAccessKey: process.env.AWS_SECRET_KEY || "",
  },
});

export const getObject = async (path: string): Promise<GetObjectCommandOutput | null> => {
  try {
    const objects = await s3Client.getObject({
      Bucket: "kepco",
      Key: path,
    });
    return objects;
  } catch (error) {
    console.log("Error get file from AWS S3", error);
    return null;
  }
};

// getObject("Radar_20201001000000.tif");
