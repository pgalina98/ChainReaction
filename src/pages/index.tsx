import React from "react";

import type { NextPage } from "next";
import Image from "next/image";

import { Button, Header } from "@components";

import authenticatedBoundaryRoute from "@components/hoc/route-guards/authenticatedBoundaryRoute";

import styles from "./index.module.scss";
import { ButtonType } from "@enums/button-type";

const Home: NextPage = () => {
  return (
    <div className="h-full">
      <Header animated showMenu backgroundColor="split" />
      <div className="grid grid-cols-2 text-white">
        <div className={`${styles.h_full} bg_primary`}>
          <div className={`${styles.h_full} ${styles.radial_gradient}`}>
            <div className="flex justify-center relative pt-14">
              <span className="text-6xl max-w-md">Take the streets.</span>
              <span className="text-4xl font-thin font_secondary absolute bottom-0 left-1/2 ml-2">
                Cowboy 4
              </span>
            </div>
            <div className="flex justify-center mt-4 text-base">
              <span className="max-w-md text-base">
                <span className="font-semibold">Shift your ride, not gears.</span>
                <span className="text-gray-200 font-thin">
                  {" "}
                  Ease your path toward the fastest way to move in the city. Free your mind as the
                  bike adapts intuitively to power the speed you need.
                </span>
              </span>
            </div>
            <div className="flex justify-center mt-10">
              <Button label="Book a test ride" type={ButtonType.LIGHT} rounded onClick={() => {}} />
            </div>
            <div className={`${styles.image_position} absolute -bottom-1`}>
              <Image
                src="/assets/e-bikes/cowboy-4/cowboy-4_white.png"
                alt="Login illustration"
                width={375}
                height={208}
                priority
              />
            </div>
          </div>
        </div>
        <div className={`${styles.h_full} bg_brown flex flex-col justify-center overflow-hidden`}>
          <div
            className={`${styles.box_shadow} absolute top-32 right-0 mr-8 bg_secondary_dark w-32 h-16 rounded-xl flex flex-col justify-center`}
          >
            <div className="flex justify-center text-lg space-x-1">
              <i className="las la-star" />
              <i className="las la-star" />
              <i className="las la-star" />
              <i className="las la-star" />
              <i className="las la-star-half-alt" />
            </div>
            <div className="flex justify-start text-xs ml-3 mt-1">+1000 reviews</div>
          </div>
          <div className={`relative ${styles.mirrored_image_position}`}>
            <Image
              src="/assets/e-bikes/cowboy-4/cowboy-4_white_mirrored.png"
              alt="Login illustration"
              width={1920}
              height={1064}
              priority
            />
          </div>
          <div className="text-white flex justify-center space-x-20 mt-8">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default authenticatedBoundaryRoute(Home);
