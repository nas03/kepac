import { createContext } from "react";

export const TimeContext = createContext<{
  time: number;
  setTime: (value: number) => void;
} | null>(null);

export const PrecipitationContext = createContext<{
  precipitation: number;
  setPrecipitation: (value: number) => void;
} | null>(null);
