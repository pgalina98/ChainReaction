import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";

import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";

import {
  Button,
  ColorPickerIcon,
  Header,
  Icon,
  LoadingOverlay,
  PlayIcon,
  Toast,
} from "@components";
import { useToast } from "@components/hooks/useToast";

import { messages } from "@constants/messages";

import { ToastType } from "@enums/toast-type";
import { ButtonType } from "@enums/button-type";
import { ProductType } from "@enums/product-type";
import { ProductColor, getProductColorValue } from "@enums/product-color";

import { isNullOrUndefined } from "@utils/common";
import { getMirroredImagePath } from "@utils/shared";
import { clearActiveTab } from "@utils/local-storage";

import Product from "@models/product/product.model";

import {
  useFadeInOutLeftVariants,
  useFadeInOutRightVariants,
  useFadeInOutVariants,
} from "@animations";

import useFetchProductsByProductType from "@features/order/api/hooks/useFetchProductsByProductType";

import authenticatedBoundaryRoute from "@components/hoc/route-guards/authenticatedBoundaryRoute";

import styles from "./index.module.scss";

const Home: NextPage = () => {
  const router = useRouter();
  const [isShown, setIsShown] = useToast({ duration: 4000 });

  const [eBikes, setEBikes] = useState<Product[]>();
  const [selectedBike, setSelectedBike] = useState<Product>();
  const [selectedColor, setSelectedColor] = useState<string>(
    getProductColorValue(ProductColor.BLACK)!
  );

  const { isLoading, isError, data, error, refetch } =
    useFetchProductsByProductType(ProductType.E_BIKE);

  useEffect(() => {
    refetch();
    clearActiveTab();
  }, []);

  useEffect(() => {
    setEBikes(data?.data.filter((bike) => bike.name === "Cowboy"));
    setSelectedBike(
      data?.data.find(
        (eBike: Product) =>
          eBike?.model === data.data[0].model &&
          eBike.color?.value === selectedColor
      )
    );
  }, [data]);

  useEffect(() => {
    setIsShown(isError);
  }, [isError]);

  useEffect(() => {
    changeSelectedBike(
      eBikes?.filter((eBike: Product) => eBike.model === selectedBike?.model)!
    );
  }, [selectedColor]);

  const isProductInSpecificColorAvailable = (color: number): boolean => {
    const eBike = eBikes?.find(
      (eBike) =>
        eBike.model === selectedBike?.model &&
        eBike?.color?.idProductColor === color
    );

    if (isNullOrUndefined(eBike)) return false;

    return eBike?.availableQuantity! > 0 || false;
  };

  const getUniqueKey = (): string => {
    return `${selectedBike?.model}`;
  };

  const changeSelectedBike = (eBikes: Product[]): void => {
    setSelectedBike(
      eBikes?.find((eBike: Product) => eBike.color?.value === selectedColor)
    );
  };

  const onLeftArrowIconClick = (): void => {
    changeSelectedBike(
      eBikes?.filter((eBike: Product) => eBike.model !== selectedBike?.model)!
    );
  };

  const onRightArrowIconClick = (): void => {
    changeSelectedBike(
      eBikes
        ?.reverse()
        ?.filter((eBike: Product) => eBike.model !== selectedBike?.model)!
    );
  };

  const onSelectedColorChange = (color: string): void => {
    setSelectedColor(color);
  };

  const navigateToRentABikePage = (): void => {
    router.push(`/rent-e-bike/${selectedBike?.idProduct}`);
  };

  if (isLoading) return <LoadingOverlay />;

  return (
    <div className="h-full">
      <Header animated showMenu backgroundColor="split" />
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
      <div className="grid grid-cols-2 text-white">
        <div className={`${styles.h_full} bg_primary`}>
          <div className={`${styles.h_full} ${styles.radial_gradient}`}>
            <motion.div
              key={getUniqueKey()}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={useFadeInOutVariants({ duration: 0.5 })}
              className="flex justify-center relative pt-14"
            >
              <div className="text-6xl max-w-lg ml-16">
                {selectedBike?.description}
                <span className="text-4xl font-thin font_secondary">
                  &nbsp;{selectedBike?.name}. {selectedBike?.model}
                </span>
              </div>
            </motion.div>
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={useFadeInOutVariants({ duration: 0.5, delay: 0.5 })}
              className="flex justify-center mt-4 text-base"
            >
              <span className="max-w-md text-base">
                <span className="font-semibold">
                  Shift your ride, not gears.
                </span>
                <span className="text-gray-200 font-thin">
                  {" "}
                  Ease your path toward the fastest way to move in the city.
                  Free your mind as the bike adapts intuitively to power the
                  speed you need.
                </span>
              </span>
            </motion.div>
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={useFadeInOutVariants({ duration: 0.5, delay: 0.5 })}
              className="flex justify-between items-center mt-10 ml-40 mr-48"
            >
              <Button
                label="Book a test ride"
                type={ButtonType.LIGHT}
                rounded
                onClick={navigateToRentABikePage}
              />
              <span className="flex ml-6">
                <p className="text-3xl font_secondary">
                  ${selectedBike?.rentPricePerHour}
                </p>
                <p className="self-end mb-1 ml-1">/ hour</p>
              </span>
            </motion.div>
            <motion.div
              key={selectedBike?.idProduct}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={useFadeInOutLeftVariants({ duration: 1 })}
              className={`${styles.image_position} absolute -bottom-1`}
            >
              {selectedBike?.imagePath && (
                <Image
                  src={selectedBike?.imagePath!}
                  alt="Cowboy 4"
                  width={375}
                  height={208}
                  priority
                />
              )}
            </motion.div>
          </div>
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={useFadeInOutVariants({ duration: 0.5, delay: 0.5 })}
            className="relative flex justify-end items-center bottom-16 right-8 space-x-6"
          >
            <div
              className={`w-10 h-10 bg_white rounded-full text-black flex items-center justify-center cursor-pointer hover:scale-105 ${styles.box_shadow_white}`}
            >
              <Icon
                className="text-2xl"
                icon="las la-angle-left"
                onClick={onLeftArrowIconClick}
              />
            </div>
            <div className={`text-xl flex justify-center ${styles.min_w_40}`}>
              {selectedBike?.model}
            </div>
            <div
              className={`w-10 h-10 bg_white rounded-full text-black flex items-center justify-center cursor-pointer hover:scale-105 ${styles.box_shadow_white}`}
            >
              <Icon
                className="text-2xl"
                icon="las la-angle-right"
                onClick={onRightArrowIconClick}
              />
            </div>
          </motion.div>
        </div>
        <div
          className={`${styles.h_full} bg_brown flex flex-col justify-center overflow-hidden`}
        >
          <div className="flex justify-end">
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={useFadeInOutVariants({ duration: 0.5, delay: 0.5 })}
              className={`${styles.box_shadow_secondary_dark} mr-8 bg_secondary_dark w-32 h-16 rounded-xl flex flex-col justify-center`}
            >
              <div className="flex justify-center text-lg space-x-1">
                <Icon icon="las la-star" />
                <Icon icon="las la-star" />
                <Icon icon="las la-star" />
                <Icon icon="las la-star" />
                <Icon icon="las la-star-half-alt" />
              </div>
              <div className="flex justify-start text-xs ml-3 mt-1">
                +1000 reviews
              </div>
            </motion.div>
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={useFadeInOutVariants({ duration: 0.5, delay: 0.5 })}
              className="absolute flex items-center justify-center top-0 right-0 mt-48 mr-2"
            >
              <Image
                src="/assets/shared/splash_white.png"
                alt="Splash white"
                width={180}
                height={100}
                priority
              />
              <div className="flex absolute mb-2 text-black">
                <div className="text-xl">$</div>
                <div className="text-4xl font-medium">
                  {selectedBike?.price}
                </div>
              </div>
            </motion.div>
          </div>
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={useFadeInOutRightVariants({
              duration: 0.25,
              delay: 0.75,
            })}
            className="absolute right-0 mr-8"
          >
            <div
              className={`${styles.box_shadow_white} flex flex-col space-y-6 bg_white p-2 rounded-full`}
            >
              <ColorPickerIcon
                className="cursor-pointer border-2 border-gray-300"
                color="WHITE"
                isSelected={selectedColor === "WHITE"}
                isAvailable={isProductInSpecificColorAvailable(
                  ProductColor.WHITE
                )}
                onClick={onSelectedColorChange}
              />
              <ColorPickerIcon
                className="cursor-pointer border-2 border-gray-300"
                color="GRAY-DARK"
                isSelected={selectedColor === "GRAY-DARK"}
                isAvailable={isProductInSpecificColorAvailable(
                  ProductColor.GRAY_DARK
                )}
                onClick={onSelectedColorChange}
              />
              <ColorPickerIcon
                className="cursor-pointer border-2 border-gray-300"
                color="BLACK"
                isSelected={selectedColor === "BLACK"}
                isAvailable={isProductInSpecificColorAvailable(
                  ProductColor.BLACK
                )}
                onClick={onSelectedColorChange}
              />
            </div>
          </motion.div>
          <motion.div
            key={selectedBike?.idProduct}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={useFadeInOutRightVariants({ duration: 1 })}
            className={`${styles.mirrored_image_position} relative ${styles.mirrored_image_position} flex`}
          >
            {selectedBike?.imagePath && (
              <Image
                src={getMirroredImagePath(selectedBike?.imagePath!)}
                alt="Cowboy 4"
                width={1920}
                height={1064}
                priority
              />
            )}
          </motion.div>
          <motion.div
            key={getUniqueKey()}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={useFadeInOutVariants({ duration: 0.5, delay: 0.5 })}
            className="text-white flex justify-center space-x-20 mt-8 mb-8"
          >
            <div className="flex flex-col items-start">
              <div className="text-2xl font-light">
                {selectedBike?.assistSpeed} km/h
              </div>
              <div className="text-gray-300 text-sm font-thin">
                Assist Speed
              </div>
            </div>
            <div className="flex flex-col items-start">
              <div className="text-2xl font-light">
                {selectedBike?.batteryRange} km
              </div>
              <div className="text-gray-300 text-sm font-thin">
                Battery Range
              </div>
            </div>
            <div className="flex flex-col items-start">
              <div className="text-2xl font-light">
                {selectedBike?.chargingTime} h
              </div>
              <div className="text-gray-300 text-sm font-thin">
                Charging Time
              </div>
            </div>
            <div className="flex flex-col items-start">
              <div className="text-2xl font-light">
                {selectedBike?.weight} kg
              </div>
              <div className="text-gray-300 text-sm font-thin">Weight</div>
            </div>
          </motion.div>
        </div>
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={useFadeInOutVariants({ duration: 0.5, delay: 0.5 })}
        >
          <PlayIcon className={styles.box_shadow_white} />
        </motion.div>
      </div>
    </div>
  );
};

export default authenticatedBoundaryRoute(Home);
