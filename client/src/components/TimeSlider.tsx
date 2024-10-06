interface TimeSliderProps {
	onTimeChange: (time: number) => void;
	initialTime: number;
}

const TimeSlider = ({ onTimeChange, initialTime }: TimeSliderProps) => {
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newTime = parseInt(event.target.value, 10);
		onTimeChange(newTime);
	};

	return (
		<input
			type="range"
			min="0"
			step={2}
			max="24"
			value={initialTime}
			onChange={handleChange}
			className="time-slider w-screen"
		/>
	);
};

export default TimeSlider;
