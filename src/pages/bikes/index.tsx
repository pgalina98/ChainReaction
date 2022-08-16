import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";

import { NextPage } from "next";

import { declassify } from "@utils/common";

import { ProductFilterKeys } from "@enums/product-filter-keys";
import { LocalStorageKeys } from "@enums/local-storage-keys";
import { ProductType as ProductTypes } from "@enums/product-type";
import { ToastType } from "@enums/toast-type";

import { messages } from "@constants/messages";

import ProductFilter, {
  createInitProductFilter,
} from "@models/product/product-filter.model";
import ProductType from "@models/product/product-type.model";
import ProductColor from "@models/product/product-color.model";
import Pagination from "@models/pagination/pagination.model";
import ProductPage from "@models/product/product-page.model";

import {
  useFadeInOutLeftVariants,
  useFadeInOutRightVariants,
  useFadeInOutVariants,
} from "@animations";

import {
  Filter,
  Header,
  Icon,
  LoadingOverlay,
  ProductCard,
  Pagination as Paginator,
  Toast,
} from "@components";
import { useToast } from "@components/hooks/useToast";

import { getValueByKey } from "@utils/local-storage";

import useFetchProductsByFilter from "@features/order/api/hooks/useFetchProductByFilter";

import styles from "./bikes.module.scss";

const Bikes: NextPage = () => {
  const [isShown, setIsShown] = useToast({ duration: 4000 });

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
  } = useFetchProductsByFilter([ProductTypes.E_BIKE, ProductTypes.BIKE]);

  useEffect(() => {
    refetch({ pagination, productFilter });
  }, [productFilter]);

  useEffect(() => {
    setProductPage(data?.data);
    setPagination({ ...pagination, totalElements: data?.data?.totalElements });
  }, [data]);

  useEffect(() => {
    setIsShown(isError);
  }, [isError]);

  const onFilterValueChange = (
    key: ProductFilterKeys,
    value: string | string[] | ProductType[] | ProductColor[] | number
  ): void => {
    setProductFilter({ ...productFilter, [key]: value });
  };

  const onPageChange = (page: number): void => {
    setPagination({ ...pagination, page });
    refetch({ pagination: { ...pagination, page }, productFilter });
  };

  const onResetButtonClick = (): void => {
    setProductFilter(createInitProductFilter());
  };

  if (isLoading) return <LoadingOverlay />;

  return (
    <div className="h-full">
      <Header animated showMenu backgroundColor="split" />
      <div className="h-screen bg_split flex relative">
        {isError && (
          <Toast
            type={ToastType.DANGER}
            message={
              error.response.data?.message || messages.INTERNAL_SERVER_ERROR
            }
            isShown={isShown}
            hideToast={() => setIsShown(false)}
          />
        )}
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
            `${styles.h_full} w-full p-8 pt-4 pb-20 grid grid-cols-3 gap-4 overflow-auto`,
            {
              "grid-cols-4": !isFilterBoxOpen,
            }
          )}
        >
          {productPage?.products?.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </motion.div>
      </div>
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={useFadeInOutVariants({ duration: 0.5, delay: 0.25 })}
      >
        {pagination?.totalElements && (
          <Paginator
            className="absolute bottom-5 pl-24 pr-10 pt-"
            pagination={pagination}
            onPageChange={onPageChange}
          />
        )}
      </motion.div>
    </div>
  );
};

export default Bikes;
