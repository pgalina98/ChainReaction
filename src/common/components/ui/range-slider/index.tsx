import React from "react";

interface RangeSliderProps {
  className?: string;
}

const RangeSlider = ({ className }: RangeSliderProps) => {
  return (
    <React.Fragment>
      <input
        className={`${className} rounded-lg overflow-hidden appearance-none bg-gray-400 h-4 w-full`}
        type="range"
        min="1"
        max="12000"
        step="150"
      />
      <div className="flex justify-between">
        <p className="font-thin">$0</p>
        <p className="font-thin">$50</p>
        <p className="font-thin">$12000</p>
      </div>
    </React.Fragment>
  );
};

export default RangeSlider;
