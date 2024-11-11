import { demoTime } from "@/data/time-demo";
import { formatDate } from "@/helper/utils";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import React, { useEffect, useState } from "react";
interface TimeSliderProps {
  onTimeChange: (time: number) => void;
  initialTime: number;
}

const TimeSlider = ({ onTimeChange, initialTime }: TimeSliderProps) => {
  const [play, setPlay] = useState(false);
  const [time, setTime] = useState(initialTime);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseInt(event.target.value, 10);
    onTimeChange(newTime);
    setTime(newTime);
  };

  const steps = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  useEffect(() => {
    if (play) {
      const intervalId = setInterval(() => {
        if (time === 24) {
          clearInterval(intervalId);
        } else {
          onTimeChange(time + 2);
          setTime((prevTime) => prevTime + 2);
        }
      }, 5000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [play, time, onTimeChange]);
  return (
    <>
      <div className="flex flex-row items-center grow max-w-screen z-[1000000] ">
        <div className="flex flex-row px-3 items-center flex-shrink">
          <ArrowLeftIcon
            className="cursor-pointer"
            fontSize="large"
            onClick={() => {
              onTimeChange(initialTime - 2);
              setTime((prev) => prev - 2);
            }}
          />
          {!play ? (
            <PlayArrowIcon
              className="cursor-pointer"
              fontSize="large"
              onClick={() => setPlay((prev) => !prev)}
            />
          ) : (
            <PauseIcon
              className="cursor-pointer"
              fontSize="large"
              onClick={() => setPlay((prev) => !prev)}
            />
          )}
          <ArrowRightIcon
            className="cursor-pointer"
            fontSize="large"
            onClick={() => {
              onTimeChange(initialTime + 2);
              setTime((prev) => prev + 2);
            }}
          />
        </div>
        <div className="flex flex-col items-start justify-between grow h-full pr-3">
          <p className="font-semibold text-lg mt-2">
            {formatDate(demoTime[time], "dddd, D MMMM YYYY")}
          </p>
          <input
            type="range"
            min="0"
            step={1}
            max="14"
            value={initialTime}
            onChange={handleChange}
            className="w-full m-0"
          />
          <datalist className="flex  flex-row justify-between m-0 w-full p-0">
            {steps.map((step: number, index: number) => (
              <option className="p-0" value={step} key={index}>
                {step === 9
                  ? `${step.toString().padStart(2, "0")}:00 (Now)`
                  : `${step.toString().padStart(2, "0")}:00`}
              </option>
            ))}
          </datalist>
        </div>
      </div>
    </>
  );
};

export default TimeSlider;
