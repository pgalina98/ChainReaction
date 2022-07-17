import React, { useState } from "react";

import { motion } from "framer-motion";

import type { NextPage } from "next";
import Image from "next/image";

import { Button, ColorPickerIcon, Header } from "@components";

import authenticatedBoundaryRoute from "@components/hoc/route-guards/authenticatedBoundaryRoute";

import { ButtonType } from "@enums/button-type";

import {
  useFadeInOutLeftVariants,
  useFadeInOutRightVariants,
  useFadeInOutVariants,
} from "@animations";

import styles from "./index.module.scss";

const Home: NextPage = () => {
  const [selectedColor, setSelectedColor] = useState<string>("white");

  const onSelectedColorChange = (color: string): void => {
    setSelectedColor(color);
  };

  return (
    <div className="h-full">
      <Header animated showMenu backgroundColor="split" />
      <div className="grid grid-cols-2 text-white">
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
                Cowboy 4
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
              initial="initial"
              animate="animate"
              exit="exit"
              variants={useFadeInOutLeftVariants({ duration: 1 })}
              className={`${styles.image_position} absolute -bottom-1`}
            >
              <Image
                src="/assets/e-bikes/cowboy-4/cowboy-4_white.png"
                alt="Login illustration"
                width={375}
                height={208}
                priority
              />
            </motion.div>
          </div>
        </div>
        <div className={`${styles.h_full} bg_brown flex flex-col justify-center overflow-hidden`}>
          <div className="flex justify-end">
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={useFadeInOutVariants({ duration: 0.5, delay: 0.5 })}
              className={`${styles.box_shadow} mr-8 bg_secondary_dark w-32 h-16 rounded-xl flex flex-col justify-center`}
            >
              <div className="flex justify-center text-lg space-x-1">
                <i className="las la-star" />
                <i className="las la-star" />
                <i className="las la-star" />
                <i className="las la-star" />
                <i className="las la-star-half-alt" />
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
            <div className="flex flex-col space-y-6 bg_white p-2 rounded-full">
              <ColorPickerIcon
                className="cursor-pointer border-2 border-gray-300"
                color="white"
                isSelected={selectedColor === "white"}
                onClick={onSelectedColorChange}
              />
              <ColorPickerIcon
                className="cursor-pointer border-2 border-gray-300"
                color="gray-dark"
                isSelected={selectedColor === "gray-dark"}
                onClick={onSelectedColorChange}
              />
              <ColorPickerIcon
                className="cursor-pointer border-2 border-gray-300"
                color="black"
                isSelected={selectedColor === "black"}
                onClick={onSelectedColorChange}
              />
            </div>
          </motion.div>
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={useFadeInOutRightVariants({ duration: 1 })}
            className={`${styles.mirrored_image_position} relative ${styles.mirrored_image_position} flex`}
          >
            <Image
              src="/assets/e-bikes/cowboy-4/cowboy-4_white_mirrored.png"
              alt="Login illustration"
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
      </div>
    </div>
  );
};

export default authenticatedBoundaryRoute(Home);
