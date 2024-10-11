import { useEffect, useState } from "react";

interface IPropsGradientScale {
  toggle: {
    precipitation: boolean;
    warn: boolean;
  };
}
const GradientScale: React.FC<IPropsGradientScale> = ({ toggle }) => {
  const [values, setValues] = useState<string[]>([]);
  useEffect(() => {
    if (toggle.precipitation) {
      setValues(["0 mm", "0.2 mm", "1 mm", "5 mm", "30 mm", "> 30 mm"]);
    } else {
      setValues(["Không mưa", "Mưa nhỏ", "Mưa vừa", "Mưa to", "Mưa rất to"]);
    }
  }, [toggle]);

  return (
    <div className="flex items-center gap-2 rounded-lg bg-white bg-opacity-65 p-2 shadow-sm">
      {/* Gradient bar */}
      <div className="relative h-[10rem] w-[1rem] overflow-hidden rounded">
        <div
          className="h-full w-full"
          style={{
            background:
              "linear-gradient(to bottom, transparent, #3a92a1, #49a43a, #993839, #a33782)",
          }}
        />
      </div>

      {/* Values */}
      <div className="flex h-[10rem] flex-col items-end justify-between text-sm font-semibold text-gray-700">
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
