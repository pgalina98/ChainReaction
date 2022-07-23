import React from "react";

import { IconColor } from "@enums/icon-color";

import { declassify } from "@utils/common";

import styles from "./social-media-icon.module.scss";

interface SocialMediaIconProps {
  className?: string;
  icon: string;
  color: "facebook" | "google" | "instagram";
  hoverable: boolean;
}

const SocialMediaIcon = ({ className, icon, color, hoverable = false }: SocialMediaIconProps) => {
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
      className={declassify(
        `${className} ml-4 mr-4 mt-2 mb-2 h-8 w-8 rounded-lg flex justify-center items-center ${
          styles[determineIconColor()]
        } ${hoverable && styles.icon_container}`,
        { "cursor-pointer": hoverable }
      )}
    >
      <i className={`${icon} text-xl`} />
    </div>
  );
};

export default SocialMediaIcon;
