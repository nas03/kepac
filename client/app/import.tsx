import dynamic from "next/dynamic";

export const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), {
  ssr: false,
});

export const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), {
  ssr: false,
});

export const GeoTIFFLayer = dynamic(() => import("@/components").then((mod) => mod.GeoTIFFLayer), {
  ssr: false,
});

export const HighlightRegion = dynamic(
  () => import("@/components").then((mod) => mod.HighlightRegion),
  {
    ssr: false,
  },
);

export const InfoTip = dynamic(() => import("@/components").then((mod) => mod.InfoTip), {
  ssr: false,
});

export const RankInfo = dynamic(() => import("@/components").then((mod) => mod.RankInfo), {
  ssr: false,
});

export const TimeSlider = dynamic(() => import("@/components").then((mod) => mod.TimeSlider), {
  ssr: false,
});

export const GradientScale = dynamic(() => import("@/components/GradientScale"), {
  ssr: false,
});

export const MarkerGroup = dynamic(() => import("@/components/MarkerGroup"), {
  ssr: false,
});

export const SetBoundsRectangles = dynamic(() => import("@/components/SetBoundsRectangles"), {
  ssr: false,
});

