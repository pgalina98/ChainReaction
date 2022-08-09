import React from "react";

import { motion } from "framer-motion";

import { declassify, toString } from "@utils/common";

import { ButtonType } from "@enums/button-type";

import {
  Icon,
  Input,
  Button,
  Checkbox,
  ColorPickerIcon,
  RangeSlider,
} from "@components";

import { useFadeInOutLeftVariants } from "@animations";

import styles from "./filter.module.scss";

interface FilterProps {
  className?: string;
  isOpen: boolean;
  toggleFilterBox: any;
}

const Filter = ({ className, isOpen = true, toggleFilterBox }: FilterProps) => {
  return (
    <motion.div
      key={toString(isOpen)}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={useFadeInOutLeftVariants({ duration: 0.3 })}
      className={declassify(
        `${className} h-full ${styles.filter_container} bg_white rounded-r-xl`,
        { visible: isOpen },
        { invisible: !isOpen }
      )}
    >
      <div className="flex items-center justify-between p-4">
        <div className="text-xl font-medium text-gray-700">Filter</div>
        <Icon
          className={`${styles.mirrored_icon} text-2xl cursor-pointer mt-1`}
          icon="las la-times"
          onClick={() => toggleFilterBox(false)}
        />
      </div>
      <hr className="border-1 w-full text-white bg_primary" />
      <div className="p-4">
        <Input
          id="search"
          prependIcon="las la-search"
          appendIcon="las la-times"
          appendIconClicable
          mirroredIcon
          placeholder="Search"
        />
        <div className="mt-4 flex justify-end">
          <Button
            label="Reset filters"
            className={`${styles.reset_filters_button} px-2 py-0`}
            type={ButtonType.DARK}
            onClick={() => {}}
          />
        </div>
        <div className="mt-2">
          <div className="block font-medium text-gray-700">Brand</div>
          <div>
            <Checkbox
              className="mt-2"
              label="Cowboy"
              additionalText="Models 4 and 4ST available."
            />
            <Checkbox
              className="mt-2"
              label="Trek"
              additionalText="Models Rail and Powerfly available."
            />
            <Checkbox
              className="mt-2"
              label="Scott"
              additionalText="Model E-MTB available."
            />
          </div>
        </div>
        <div className="mt-4">
          <div className="block font-medium text-gray-700">Type</div>
          <div className="mt-2">
            <Checkbox
              className="mt-2"
              label="Electric"
              additionalText="With electrical drive option."
            />
            <Checkbox
              className="mt-2"
              label="Normal"
              additionalText="Without electrical drive option."
            />
          </div>
        </div>
        <div className="mt-4">
          <div className="block font-medium text-gray-700">Color</div>
          <div className="flex space-x-4 mt-2">
            <ColorPickerIcon
              className="cursor-pointer border-2 border-gray-300"
              color="WHITE"
              isSelected={true}
              onClick={() => {}}
            />
            <ColorPickerIcon
              className="cursor-pointer border-2 border-gray-300"
              color="GRAY-DARK"
              onClick={() => {}}
            />
            <ColorPickerIcon
              className="cursor-pointer border-2 border-gray-300"
              color="BLACK"
              onClick={() => {}}
            />
          </div>
        </div>
        <div className="mt-4">
          <div className="block font-medium text-gray-700">Price</div>
          <RangeSlider className="mt-2" />
        </div>
      </div>
    </motion.div>
  );
};

export default Filter;
