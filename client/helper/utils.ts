import type { HighlightLayer, RasterLayer } from "@/types";

export const formatToISOWithTimezone = (dateInput: string) => {
  const date = new Date(dateInput);
  const isoString = date.toLocaleString();
  if (isoString === "Invalid Date") return "None";
  return isoString;
};
export const formatToDate = (dateInput: string) => {
  const time = new Date(dateInput).toLocaleTimeString();
  const date = new Date(dateInput).toLocaleDateString();
  return `${date} - ${time}`;
};
export const formatPrecipitation = (precipitation: number) => {
  return `${precipitation.toFixed(3)} mm`;
};

export const isRasterLayer = (layer: unknown): layer is RasterLayer => {
  return typeof layer === "object" && layer !== null && "rasters" in layer && "georasters" in layer;
};

export const isHighlightLayer = (layer: unknown): layer is HighlightLayer => {
  if (typeof layer !== "object" || layer === null) {
    return false;
  }

  const candidate = layer as Partial<HighlightLayer>;

  return (
    "defaultOptions" in candidate &&
    typeof candidate.defaultOptions === "object" &&
    candidate.defaultOptions !== null &&
    "attribution" in candidate.defaultOptions &&
    typeof candidate.defaultOptions.attribution === "string"
  );
};
