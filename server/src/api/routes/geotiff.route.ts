import { geotiffController } from "@/api/controller";
import { use } from "@/utils/utils";
import { Router } from "express";

const geoTIFFRoute = Router();

geoTIFFRoute.get("/geotiff", use(geotiffController.getGeoTIFF));
geoTIFFRoute.post("/geotiff/dataset", use(geotiffController.loadSampleData));

export default geoTIFFRoute;
