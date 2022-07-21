import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";

import type { NextPage } from "next";
import Image from "next/image";

import { Button, ColorPickerIcon, Header, Icon, PlayIcon, Toast } from "@components";
import { useToast } from "@components/hooks/useToast";

import { ToastType } from "@enums/toast-type";
import { ButtonType } from "@enums/button-type";
import { ProductType } from "@enums/product-type";
import { ProductColor, getProductColorValue } from "@enums/product-color";

import Product from "@models/product.model";

import {
  useFadeInOutLeftVariants,
  useFadeInOutRightVariants,
  useFadeInOutVariants,
} from "@animations";

import useFetchProductsByProductType from "@features/product/api/hooks/useFetchProductsByProductType";

import { messages } from "@constants/messages";

import authenticatedBoundaryRoute from "@components/hoc/route-guards/authenticatedBoundaryRoute";

import styles from "./index.module.scss";

const Home: NextPage = () => {
  const [isShown, setIsShown] = useToast({ duration: 4000 });

  const [eBikes, setEBikes] = useState<Product[]>();
  const [selectedBike, setSelectedBike] = useState<Product>();
  const [selectedColor, setSelectedColor] = useState<string>(
    getProductColorValue(ProductColor.WHITE)!
  );

  const { isLoading, isError, isSuccess, data, error } = useFetchProductsByProductType(
    ProductType.E_BIKE
  );

  useEffect(() => {
    if (isSuccess) {
      setEBikes(data?.data);
      setSelectedBike(data?.data[0]);
    }
  }, [data, isSuccess]);

  useEffect(() => {
    setIsShown(isError);
  }, [isError, setIsShown]);

  useEffect(() => {
    changeSelectedBike(eBikes?.filter((eBike: Product) => eBike.model === selectedBike?.model)!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedColor]);

  const changeSelectedBike = (eBikes: Product[]): void => {
    setSelectedBike(eBikes?.find((eBike: Product) => eBike.color?.value === selectedColor));
  };

  const onLeftArrowIconClick = (): void => {
    changeSelectedBike(eBikes?.filter((eBike: Product) => eBike.model !== selectedBike?.model)!);
  };

  const onRightArrowIconClick = (): void => {
    changeSelectedBike(
      eBikes?.reverse()?.filter((eBike: Product) => eBike.model !== selectedBike?.model)!
    );
  };

  const onSelectedColorChange = (color: string): void => {
    setSelectedColor(color);
  };

  return (
    <div className="h-full">
      <Header animated showMenu backgroundColor="split" />
      <div className="grid grid-cols-2 text-white">
        {isError && (
          <Toast
            type={ToastType.DANGER}
            message={error.response.data?.message || messages.INTERNAL_SERVER_ERROR}
            isShown={isShown}
            hideToast={() => setIsShown(false)}
          />
        )}
        <div className={`${styles.h_full} bg_primary`}>
          <div className={`${styles.h_full} ${styles.radial_gradient}`}>
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={useFadeInOutVariants({ duration: 0.5 })}
              className="flex justify-center relative pt-14"
            >
              <span className="text-6xl max-w-md">Take the streets.</span>
              <span className="text-4xl font-thin font_secondary absolute bottom-0 left-1/2 ml-2">
                Cowboy. 4
              </span>
            </motion.div>
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={useFadeInOutVariants({ duration: 0.5, delay: 0.5 })}
              className="flex justify-center mt-4 text-base"
            >
              <span className="max-w-md text-base">
                <span className="font-semibold">Shift your ride, not gears.</span>
                <span className="text-gray-200 font-thin">
                  {" "}
                  Ease your path toward the fastest way to move in the city. Free your mind as the
                  bike adapts intuitively to power the speed you need.
                </span>
              </span>
            </motion.div>
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={useFadeInOutVariants({ duration: 0.5, delay: 0.5 })}
              className="flex justify-center mt-10"
            >
              <Button label="Book a test ride" type={ButtonType.LIGHT} rounded onClick={() => {}} />
            </motion.div>
            <motion.div
              key={selectedColor}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={useFadeInOutLeftVariants({ duration: 1 })}
              className={`${styles.image_position} absolute -bottom-1`}
            >
              <Image
                src={`/assets/e-bikes/cowboy-4st/cowboy-4st-dark-gray.png`}
                alt="Cowboy 4"
                width={375}
                height={208}
                priority
              />
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
              <Icon className="las la-angle-left text-2xl" onClick={onLeftArrowIconClick} />
            </div>
            <div className="text-xl">{selectedBike?.model}</div>
            <div
              className={`w-10 h-10 bg_white rounded-full text-black flex items-center justify-center cursor-pointer hover:scale-105 ${styles.box_shadow_white}`}
            >
              <Icon className="las la-angle-right text-2xl" onClick={onRightArrowIconClick} />
            </div>
          </motion.div>
        </div>
        <div className={`${styles.h_full} bg_brown flex flex-col justify-center overflow-hidden`}>
          <div className="flex justify-end">
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={useFadeInOutVariants({ duration: 0.5, delay: 0.5 })}
              className={`${styles.box_shadow_secondary_dark} mr-8 bg_secondary_dark w-32 h-16 rounded-xl flex flex-col justify-center`}
            >
              <div className="flex justify-center text-lg space-x-1">
                <Icon className="las la-star" />
                <Icon className="las la-star" />
                <Icon className="las la-star" />
                <Icon className="las la-star" />
                <Icon className="las la-star-half-alt" />
              </div>
              <div className="flex justify-start text-xs ml-3 mt-1">+1000 reviews</div>
            </motion.div>
          </div>
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={useFadeInOutRightVariants({ duration: 0.25, delay: 0.75 })}
            className="absolute right-0 mr-8"
          >
            <div
              className={`${styles.box_shadow_white} flex flex-col space-y-6 bg_white p-2 rounded-full`}
            >
              <ColorPickerIcon
                className="cursor-pointer border-2 border-gray-300"
                color="WHITE"
                isSelected={selectedColor === "WHITE"}
                onClick={onSelectedColorChange}
              />
              <ColorPickerIcon
                className="cursor-pointer border-2 border-gray-300"
                color="GRAY-DARK"
                isSelected={selectedColor === "GRAY-DARK"}
                isAvailable={false}
                onClick={onSelectedColorChange}
              />
              <ColorPickerIcon
                className="cursor-pointer border-2 border-gray-300"
                color="BLACK"
                isSelected={selectedColor === "BLACK"}
                onClick={onSelectedColorChange}
              />
            </div>
          </motion.div>
          <motion.div
            key={selectedColor}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={useFadeInOutRightVariants({ duration: 1 })}
            className={`${styles.mirrored_image_position} relative ${styles.mirrored_image_position} flex`}
          >
            <Image
              src="/assets/e-bikes/cowboy-4st/cowboy-4st-dark-gray_mirrored.png"
              alt="Cowboy 4"
              width={1920}
              height={1064}
              priority
            />
          </motion.div>
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={useFadeInOutVariants({ duration: 0.5, delay: 0.5 })}
            className="text-white flex justify-center space-x-20 mt-8 mb-8"
          >
            <div className="flex flex-col items-start">
              <div className="text-2xl font-light">25 km/h</div>
              <div className="text-gray-300 text-sm font-thin">Assist Speed</div>
            </div>
            <div className="flex flex-col items-start">
              <div className="text-2xl font-light">70 km</div>
              <div className="text-gray-300 text-sm font-thin">Battery Range</div>
            </div>
            <div className="flex flex-col items-start">
              <div className="text-2xl font-light">3.5 h</div>
              <div className="text-gray-300 text-sm font-thin">Charging Time</div>
            </div>
            <div className="flex flex-col items-start">
              <div className="text-2xl font-light">16.9 kg</div>
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
