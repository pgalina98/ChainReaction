import React from "react";

interface RangeSliderProps {
  className?: string;
  selectedValue: number;
  onChange: any;
}

const RangeSlider = ({
  className,
  selectedValue = 0,
  onChange,
}: RangeSliderProps) => {
  return (
    <React.Fragment>
      <input
        className={`${className} rounded-lg overflow-hidden appearance-none bg-gray-400 h-4 w-full`}
        type="range"
        min="0"
        max="12000"
        step="50"
        onChange={({ target: { value } }) => onChange(value)}
      />
      <div className="flex justify-between">
        <p className="font-thin">$0</p>
        <p className="font-thin">${selectedValue || 0}</p>
        <p className="font-thin">$12000</p>
      </div>
    </React.Fragment>
  );
};

export default RangeSlider;
