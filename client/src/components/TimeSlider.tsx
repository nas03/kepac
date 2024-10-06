import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useEffect, useState } from 'react';
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

	useEffect(() => {
		if (play) {
			const intervalId = setInterval(() => {
				if (time === 24) {
					clearInterval(intervalId);
				} else {
					onTimeChange(time + 2);
					setTime((prevTime) => prevTime + 2);
				}
			}, 1000);

			return () => {
				clearInterval(intervalId);
			};
		}
	}, [play, time]);
	return (
		<>
			<div className="flex flex-row w-screen h-[5vh]">
				<div className="flex flex-row px-3 items-center">
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
				<input
					type="range"
					min="0"
					step={2}
					max="24"
					value={initialTime}
					onChange={handleChange}
					className="time-slider grow"
				/>
			</div>
		</>
	);
};

export default TimeSlider;
