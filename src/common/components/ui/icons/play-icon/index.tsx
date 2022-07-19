import React from "react";

interface PlayIconProps {
  className?: string;
}

export const PlayIcon = ({ className }: PlayIconProps) => {
  return (
    <div
      className={`${className} absolute top-1/2 right-1/2 translate-x-1/2 text-4xl w-14 h-14 text-black bg_white rounded-full flex items-center justify-center cursor-pointer hover:scale-105`}
    >
      <i className="las la-play" />
    </div>
  );
};

export default PlayIcon;
