import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";

import { NextPage } from "next";

import { declassify } from "@utils/common";

import { ProductFilterKeys } from "@enums/product-filter-keys";
import { LocalStorageKeys } from "@enums/local-storage-keys";
import { ProductType as ProductTypes } from "@enums/product-type";

import ProductFilter, {
  createInitProductFilter,
} from "@models/product/product-filter.model";
import ProductType from "@models/product/product-type.model";
import ProductColor from "@models/product/product-color.model";
import Pagination from "@models/pagination/pagination.model";
import ProductPage from "@models/product/product-page.model";
import Product from "@models/product/product.model";

import {
  useFadeInOutLeftVariants,
  useFadeInOutRightVariants,
} from "@animations";

import {
  Filter,
  Header,
  Icon,
  LoadingOverlay,
  ProductCard,
  Pagination as Paginator,
} from "@components";

import { getValueByKey } from "@utils/local-storage";

import useFetchProductsByFilter from "@features/order/api/hooks/useFetchProductByFilter";

import styles from "./bikes.module.scss";

const Bikes: NextPage = () => {
  const [isFilterBoxOpen, setIsFilterBoxOpen] = useState<boolean>(false);

  const [productPage, setProductPage] = useState<ProductPage>();
  const [pagination, setPagination] = useState<Pagination>(
    JSON.parse(getValueByKey(LocalStorageKeys.PAGING_SETTINGS)!)
  );
  const [productFilter, setProductFilter] = useState<ProductFilter>(
    createInitProductFilter()
  );

  const {
    isLoading,
    isError,
    isSuccess,
    data,
    error,
    mutate: refetch,
  } = useFetchProductsByFilter([ProductTypes.BIKE, ProductTypes.E_BIKE]);

  useEffect(() => {
    refetch({ pagination, productFilter });
  }, [pagination, productFilter]);

  useEffect(() => {
    setProductPage(data?.data);
  }, [data]);

  const onFilterValueChange = (
    key: ProductFilterKeys,
    value: string | string[] | ProductType[] | ProductColor[] | number
  ): void => {
    setProductFilter({ ...productFilter, [key]: value });
  };

  const distinctByModel = (products: Product[]): Product[] => {
    return [
      ...new Map(
        products?.map((product) => [product["model"], product])
      ).values(),
    ];
  };

  const onResetButtonClick = (): void => {
    setProductFilter(createInitProductFilter());
  };

  if (isLoading) return <LoadingOverlay />;

  return (
    <div className="h-full">
      <Header animated showMenu backgroundColor="split" />
      <div className="h-screen bg_split flex relative">
        <div
          className={declassify(`h-full w-16`, {
            hidden: isFilterBoxOpen,
          })}
        >
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={useFadeInOutLeftVariants({ duration: 0.5 })}
            className="w-20 h-12 absolute -left-5 flex items-center justify-center p-2 bg_white rounded-full cursor-pointer"
            onClick={() => setIsFilterBoxOpen(true)}
          >
            <Icon className="ml-3 text-2xl" icon="las la-filter" />
          </motion.div>
        </div>
        <Filter
          isOpen={isFilterBoxOpen}
          toggleFilterBox={setIsFilterBoxOpen}
          productFilter={productFilter}
          onFilterValueChange={onFilterValueChange}
          onResetButtonClick={onResetButtonClick}
        />
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={useFadeInOutRightVariants({
            duration: 0.75,
            delay: 0.25,
          })}
          className={declassify(
            `${styles.h_full} w-full p-8 pt-4 pb-16 grid grid-cols-3 gap-4 overflow-auto`,
            {
              "grid-cols-4": !isFilterBoxOpen,
            }
          )}
        >
          {distinctByModel(productPage?.products!).map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </motion.div>
      </div>
      <Paginator className="absolute bottom-5 pl-24 pr-10" />
    </div>
  );
};

export default Bikes;
