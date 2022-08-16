import React from "react";

import { motion } from "framer-motion";

import { declassify, toNumber, toString } from "@utils/common";

import { ButtonType } from "@enums/button-type";
import { ProductFilterKeys } from "@enums/product-filter-keys";
import { ProductType } from "@enums/product-type";
import { ProductColor } from "@enums/product-color";

import ProductFilter from "@models/product/product-filter.model";

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
  productFilter: ProductFilter;
  onFilterValueChange: any;
  onApplyFiltersButtonClick: any;
  onResetFiltersButtonClick?: any;
}

const Filter = ({
  className,
  isOpen = true,
  toggleFilterBox,
  productFilter,
  onFilterValueChange,
  onApplyFiltersButtonClick,
  onResetFiltersButtonClick,
}: FilterProps) => {
  return (
    <motion.div
      key={toString(isOpen)}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={useFadeInOutLeftVariants({ duration: 0.3 })}
      className={declassify(
        `${className} h-full ${styles.filter_container} bg_white rounded-r-xl z-20`,
        { visible: isOpen },
        { "invisible hidden": !isOpen }
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
          onAppendIconClick={() =>
            onFilterValueChange(ProductFilterKeys.KEYWORD, "")
          }
          mirroredIcon
          placeholder="Search"
          value={productFilter?.keyword}
          onChange={(value) =>
            onFilterValueChange(ProductFilterKeys.KEYWORD, value)
          }
        />
        <div className="mt-4 flex justify-between">
          <Button
            label="Save filters"
            className={styles.control_button}
            type={ButtonType.DARK}
            onClick={onApplyFiltersButtonClick}
          />
          <Button
            label="Reset filters"
            className={styles.control_button}
            type={ButtonType.DARK}
            onClick={onResetFiltersButtonClick}
          />
        </div>
        <div className="mt-2">
          <div className="block font-medium text-gray-700">Brand</div>
          <div>
            <Checkbox
              className="mt-2"
              label="Cowboy"
              additionalText="Models 4 and 4ST available."
              isChecked={productFilter?.brands?.includes("Cowboy")!}
              onChange={(value) => {
                if (productFilter?.brands?.includes(value)) {
                  onFilterValueChange(ProductFilterKeys.BRANDS, [
                    ...productFilter?.brands?.filter(
                      (brand) => brand !== value
                    )!,
                  ]);
                } else {
                  onFilterValueChange(ProductFilterKeys.BRANDS, [
                    ...productFilter?.brands!,
                    value,
                  ]);
                }
              }}
            />
            <Checkbox
              className="mt-2"
              label="Trek"
              additionalText="Models Rail and Powerfly available."
              isChecked={productFilter?.brands?.includes("Trek")!}
              onChange={(value) => {
                if (productFilter?.brands?.includes(value)) {
                  onFilterValueChange(ProductFilterKeys.BRANDS, [
                    ...productFilter?.brands?.filter(
                      (brand) => brand !== value
                    )!,
                  ]);
                } else {
                  onFilterValueChange(ProductFilterKeys.BRANDS, [
                    ...productFilter?.brands!,
                    value,
                  ]);
                }
              }}
            />
            <Checkbox
              className="mt-2"
              label="Scott"
              additionalText="Model Ransom available."
              isChecked={productFilter?.brands?.includes("Scott")!}
              onChange={(value) => {
                if (productFilter?.brands?.includes(value)) {
                  onFilterValueChange(ProductFilterKeys.BRANDS, [
                    ...productFilter?.brands?.filter(
                      (brand) => brand !== value
                    )!,
                  ]);
                } else {
                  onFilterValueChange(ProductFilterKeys.BRANDS, [
                    ...productFilter?.brands!,
                    value,
                  ]);
                }
              }}
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
              isChecked={productFilter?.types?.includes(ProductType.E_BIKE!)!}
              onChange={() => {
                if (productFilter?.types?.includes(ProductType.E_BIKE)!) {
                  onFilterValueChange(ProductFilterKeys.TYPES, [
                    ...productFilter?.types?.filter(
                      (type) => type !== ProductType.E_BIKE
                    )!,
                  ]);
                } else {
                  onFilterValueChange(ProductFilterKeys.TYPES, [
                    ...productFilter?.types!,
                    ProductType.E_BIKE,
                  ]);
                }
              }}
            />
            <Checkbox
              className="mt-2"
              label="Normal"
              additionalText="Without electrical drive option."
              isChecked={productFilter?.types?.includes(ProductType.BIKE!)!}
              onChange={() => {
                if (productFilter?.types?.includes(ProductType.BIKE!)) {
                  onFilterValueChange(ProductFilterKeys.TYPES, [
                    ...productFilter?.types?.filter(
                      (type) => type !== ProductType.BIKE
                    )!,
                  ]);
                } else {
                  onFilterValueChange(ProductFilterKeys.TYPES, [
                    ...productFilter?.types!,
                    ProductType.BIKE,
                  ]);
                }
              }}
            />
          </div>
        </div>
        <div className="mt-4">
          <div className="block font-medium text-gray-700">Color</div>
          <div className="flex space-x-4 mt-2">
            <ColorPickerIcon
              className="cursor-pointer border-2 border-gray-300"
              color="WHITE"
              isSelected={productFilter?.colors?.includes(ProductColor.WHITE!)}
              onClick={(value) => {
                if (productFilter?.colors?.includes(value)) {
                  onFilterValueChange(ProductFilterKeys.COLORS, [
                    ...productFilter?.colors?.filter(
                      (color) => color !== value
                    )!,
                  ]);
                } else {
                  onFilterValueChange(ProductFilterKeys.COLORS, [
                    ...productFilter?.colors!,
                    value,
                  ]);
                }
              }}
            />
            <ColorPickerIcon
              className="cursor-pointer border-2 border-gray-300"
              color="GRAY-DARK"
              isSelected={productFilter?.colors?.includes(
                ProductColor.GRAY_DARK!
              )}
              onClick={(value) => {
                if (productFilter?.colors?.includes(value)) {
                  onFilterValueChange(ProductFilterKeys.COLORS, [
                    ...productFilter?.colors?.filter(
                      (color) => color !== value
                    )!,
                  ]);
                } else {
                  onFilterValueChange(ProductFilterKeys.COLORS, [
                    ...productFilter?.colors!,
                    value,
                  ]);
                }
              }}
            />
            <ColorPickerIcon
              className="cursor-pointer border-2 border-gray-300"
              color="BLACK"
              isSelected={productFilter?.colors?.includes(ProductColor.BLACK!)}
              onClick={(value) => {
                if (productFilter?.colors?.includes(value)) {
                  onFilterValueChange(ProductFilterKeys.COLORS, [
                    ...productFilter?.colors?.filter(
                      (color) => color !== value
                    )!,
                  ]);
                } else {
                  onFilterValueChange(ProductFilterKeys.COLORS, [
                    ...productFilter?.colors!,
                    value,
                  ]);
                }
              }}
            />
          </div>
        </div>
        <div className="mt-4">
          <div className="block font-medium text-gray-700">Price</div>
          <RangeSlider
            className="mt-2"
            selectedValue={productFilter?.maxPrice!}
            onChange={(value) =>
              onFilterValueChange(ProductFilterKeys.MAX_PRICE, toNumber(value))
            }
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Filter;
