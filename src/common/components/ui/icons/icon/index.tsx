import React from "react";

interface IconProps {
  className: string;
  onClick?: any;
}

export const Icon = ({ className, onClick }: IconProps) => {
  return <i className={className} {...(onClick && { onClick: onClick })} />;
};

export default Icon;
