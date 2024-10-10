const GradientScale = () => {
  const values = [0, 0.2, 1, 5, 30, "> 30"];

  return (
    <div className="flex items-center gap-2 rounded-lg bg-white bg-opacity-65 p-2 shadow-sm">
      {/* Gradient bar */}
      <div className="relative h-[10rem] w-[1rem] overflow-hidden rounded">
        <div
          className="h-full w-full"
          style={{
            background:
              "linear-gradient(to bottom, #3a92a1, #49a43a, #993839, #a33782)",
          }}
        />
      </div>

      {/* Values */}
      <div className="flex h-[10rem] flex-col items-center justify-between text-sm font-semibold text-gray-600">
        {values.map((value) => (
          <div key={value} className="leading-none">
            {value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GradientScale;
