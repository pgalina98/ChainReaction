import React from "react";

interface IconProps {
  className: string;
}

export const Icon = ({ className }: IconProps) => {
  return <i className={className} />;
};

export default Icon;
