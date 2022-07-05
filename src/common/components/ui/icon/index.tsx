import React from "react";

import { IconColor } from "@enums/icon-color";

import styles from "./icon.module.scss";

interface IconProps {
  className?: string;
  icon: string;
  color: "facebook" | "google" | "instagram";
  hoverable: boolean;
}

const Icon = ({ className, icon, color, hoverable = false }: IconProps) => {
  const determineIconColor = (): string => {
    switch (color) {
      case "facebook":
        return IconColor.FACEBOOK;

      case "google":
        return IconColor.GOOGLE;

      case "instagram":
        return IconColor.INSTAGRAM;

      default:
        return IconColor.FACEBOOK;
    }
  };

  return (
    <div
      className={`${className} ml-4 mr-4 mt-2 mb-2 h-8 w-8 rounded-lg flex justify-center items-center ${
        styles[determineIconColor()]
      } ${hoverable && "cursor-pointer"} ${hoverable && `${styles.icon_container}`}`}
    >
      <i className={`${icon} text-xl`} />
    </div>
  );
};

export default Icon;
