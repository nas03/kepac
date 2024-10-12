/* eslint-disable @typescript-eslint/no-explicit-any */

export type RasterData = {
  layer: {
    pixelValuesToColorFn: (
      pixelValues: number[],
    ) => "#3a92a1" | "#49a43a" | "#993839" | "#a33782" | null;
    resolution: number;
    opacity: number;
    georaster: any;
  } | null;
  georaster: any;
};

export type PrecipitationRecord = {
  id: number;
  district_id: number;
  avg_precipitation: number;
  geo_id: string;
  province_name: string;
  district_name: string;
  district_code: string;
  geo_type: string;
  time: string;
  updated_at: Date | null;
  created_at: Date | null;
};

export interface ExternalProps {
  toggle: {
    precipitation: boolean;
    warn: boolean;
  };
}

export interface RasterLayer {
  rasters: unknown;
  georasters: unknown;
}
export interface HighlightLayer extends L.Layer {
  defaultOptions?: {
    attribution?: string;
  };
}
