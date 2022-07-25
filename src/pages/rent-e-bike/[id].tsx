import React, { useEffect, useState } from "react";

import Image from "next/image";
import { useRouter } from "next/router";

import { BackIcon, Button, Card, Header, ProgressBar, Stepper } from "@components";

import { ProductSize } from "@enums/product-size";
import { RentABikeStep, RentABikeSteps } from "@enums/rent-a-bike-step";

import Product from "@models/product.model";

import { isNullOrUndefined } from "@utils/common";

import styles from "./rent-a-bike.module.scss";

const RentEBike = () => {
  const router = useRouter();

  const { id } = router.query;

  const [selectedHelmet, setSelectedHelmet] = useState<Product>();
  const [selectedSize, setSelectedSize] = useState<ProductSize>();
  const [currentStep, setCurrentStep] = useState<RentABikeStep>(RentABikeStep.SELECT_GEAR);

  const navigateToPreviousPage = () => {
    router.back();
  };

  const calcluateProgressBarValue = (value: number, comparatievValue: number): number => {
    return Math.round((value / comparatievValue) * 100);
  };

  const onSelectedHelmetChange = (helmet: Product): void => {
    setSelectedHelmet(helmet);
  };

  const onSelectedSizeChange = (size: ProductSize): void => {
    setSelectedSize(size);
  };

  const onNextButtonClick = (): void => {
    setCurrentStep(RentABikeSteps[currentStep + 1]);
  };

  const onPreviousButtonClick = (): void => {
    setCurrentStep(RentABikeSteps[currentStep - 1]);
  };

  const iseNextButtonDisabled = (): boolean => {
    return isNullOrUndefined(selectedHelmet) || isNullOrUndefined(selectedSize);
  };

  const isPreviousButtonHidden = (): boolean => {
    return currentStep === RentABikeStep.SELECT_GEAR || currentStep === RentABikeStep.FINISHED;
  };

  return (
    <div className="h-full">
      <Header animated showMenu backgroundColor="split" />
      <div className="grid grid-cols-2 text-white">
        <div className={`${styles.h_full} bg_primary overflow-hidden`}>
          <BackIcon className="flex justify-end mt-4 mr-12" onClick={navigateToPreviousPage} />
          <div className="ml-12 max-w-xl">
            <p className=" text-6xl font_secondary">Cowboy. 4</p>
            <p className="text-4xl mt-2">Dream machine</p>
            <p className="mt-6 flex">
              <p className="text-3xl font_secondary">$5</p>
              <p className="self-end mb-1 ml-1">/ hour</p>
            </p>
            <Card className="p-4 pl-6 pr-6 mt-6 w-48 h-32 text-black ">
              <p className="text-xl font-light">100 km/h</p>
              <p className="text-gray text-sm font-thin">Assist Speed</p>
              <ProgressBar value={calcluateProgressBarValue(25, 35)} />
            </Card>
            <Card className="p-4 pl-6 pr-6 mt-6 w-48 h-32 text-black ">
              <p className="text-xl font-light">100 km</p>
              <p className="text-gray text-sm font-thin">Battery Range</p>
              <ProgressBar value={calcluateProgressBarValue(70, 100)} />
            </Card>
            <Card className="p-4 pl-6 pr-6 mt-6 w-48 h-32 text-black ">
              <p className="text-xl font-light">16.2 kg</p>
              <p className="text-gray text-sm font-thin">Weight</p>
              <ProgressBar value={calcluateProgressBarValue(16.2, 29.6)} />
            </Card>
          </div>
          <div className={`relative ${styles.mirrored_image_position}`}>
            <Image
              src={"/assets/e-bikes/cowboy-4/cowboy-4-white_mirrored.png"}
              alt="Cowboy 4"
              width={1920}
              height={1064}
              priority
            />
          </div>
        </div>
        <div className={`${styles.h_full} bg_brown`}>
          <Stepper className="pt-8" currentStep={currentStep!} />
          <div className="px-12 py-8">
            <div className="mt-6">
              <p className="font-medium text-2xl">Select a helmet</p>
              <div className="mt-4 flex justify-start space-x-8">
                <Card
                  className="text-black p-4 w-36 h-36 flex items-center justify-center cursor-pointer hover:scale-105"
                  onClick={() => {}}
                >
                  <Image
                    src="/assets/helmets/alpina/alpina_white.png"
                    alt="Register illustration"
                    width={110}
                    height={110}
                    priority
                  />
                </Card>
              </div>
            </div>
            <div className="mt-10">
              <p className="font-medium text-2xl">Select a size</p>
              <div className="mt-4 flex justify-start space-x-6">
                <Card
                  className="text-black p-4 w-32 flex flex-col justify-between cursor-pointer hover:scale-105"
                  isSelected={selectedSize === ProductSize.S}
                  onClick={() => onSelectedSizeChange(ProductSize.S)}
                >
                  <div className="text-s self-center">s</div>
                  <div className="font-light text-base self-start">Small</div>
                </Card>
                <Card
                  className="text-black p-4 w-32 flex flex-col justify-between cursor-pointer hover:scale-105"
                  isSelected={selectedSize === ProductSize.M}
                  onClick={() => onSelectedSizeChange(ProductSize.M)}
                >
                  <div className="text-base self-center">m</div>
                  <div className="font-light text-base self-start">Medium</div>
                </Card>
                <Card
                  className="text-black p-4 w-32 flex flex-col justify-between cursor-pointer hover:scale-105"
                  isSelected={selectedSize === ProductSize.L}
                  onClick={() => onSelectedSizeChange(ProductSize.L)}
                >
                  <div className="text-lg self-center">l</div>
                  <div className="font-light text-base self-start">Large</div>
                </Card>
                <Card
                  className="text-black p-4 w-32 flex flex-col justify-between cursor-pointer hover:scale-105"
                  isSelected={selectedSize === ProductSize.XL}
                  onClick={() => onSelectedSizeChange(ProductSize.XL)}
                >
                  <div className="text-xl self-center">xl</div>
                  <div className="font-light text-base self-start">Extra Large</div>
                </Card>
              </div>
            </div>
          </div>
          <Button
            label="Previous"
            prependIcon="las la-arrow-left"
            className={`absolute w-32 mb-6 ml-12 ${styles.previous_button}`}
            // isDisabled={iseNextButtonDisabled()}
            isHidden={isPreviousButtonHidden()}
            onClick={() => onPreviousButtonClick()}
          />
          <Button
            label="Next"
            appendIcon="las la-arrow-right"
            className={`absolute w-32 mb-6 mr-12 ${styles.next_button}`}
            // isDisabled={iseNextButtonDisabled()}
            onClick={() => onNextButtonClick()}
          />
        </div>
      </div>
    </div>
  );
};

export default RentEBike;
