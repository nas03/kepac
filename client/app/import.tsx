import dynamic from "next/dynamic";

// React-leaflet
export const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), {
  ssr: false,
});
export const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), {
  ssr: false,
});
export const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), {
  ssr: false,
});
export const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

// Components
export const GeoTIFFLayer = dynamic(() => import("@/components/GeoTIFFLayer"), {
  ssr: false,
});

export const HighlightRegion = dynamic(() => import("@/components/HighlightRegion"), {
  ssr: false,
});

export const InfoTip = dynamic(() => import("@/components/InfoTip"), {
  ssr: false,
});

export const RankInfo = dynamic(() => import("@/components/RankInfo"), {
  ssr: false,
});

export const TimeSlider = dynamic(() => import("@/components/TimeSlider"), {
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

export const RightOverlayLayer = dynamic(() => import("@/components/RightOverlayLayer"), {
  ssr: false,
});

export const ExternalLayer = dynamic(() => import("@/components/ExternalLayer"), {
  ssr: false,
});
export const Zoom = dynamic(() => import("@/components/Zoom"), {
  ssr: false,
});
