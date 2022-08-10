import React, { useState } from "react";

import { NextPage } from "next";

import { ProductFilterKeys } from "@enums/product-filter-keys";

import ProductFilter, {
  createInitProductFilter,
} from "@models/product-filter.model";
import ProductType from "@models/product-type.model";
import ProductColor from "@models/product-color.model";

import { Filter, Header, Icon } from "@components";

const Bikes: NextPage = () => {
  const [isFilterBoxOpen, setIsFilterBoxOpen] = useState<boolean>(false);

  const [productFilter, setProductFilter] = useState<ProductFilter>(
    createInitProductFilter()
  );

  const onFilterValueChange = (
    key: ProductFilterKeys,
    value: string | string[] | ProductType[] | ProductColor[] | number
  ): void => {
    setProductFilter({ ...productFilter, [key]: value });
  };

  const onResetButtonClick = (): void => {
    setProductFilter(createInitProductFilter());
  };

  return (
    <div className="h-full">
      <Header animated showMenu backgroundColor="split" />
      <div className="h-screen bg_split">
        <div
          className="w-20 h-12 absolute -left-5 flex items-center justify-center p-2 bg_white rounded-full cursor-pointer"
          onClick={() => setIsFilterBoxOpen(true)}
        >
          <Icon className="ml-3 text-2xl" icon="las la-filter" />
        </div>
        <Filter
          isOpen={isFilterBoxOpen}
          toggleFilterBox={setIsFilterBoxOpen}
          productFilter={productFilter}
          onFilterValueChange={onFilterValueChange}
          onResetButtonClick={onResetButtonClick}
        />
      </div>
    </div>
  );
};

export default Bikes;
