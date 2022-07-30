import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";

import dayjs, { Dayjs } from "dayjs";

import Image from "next/image";
import { useRouter } from "next/router";

import {
  BackIcon,
  Button,
  Card,
  DatePickerStripe,
  DateTimeCard,
  Header,
  Icon,
  LoadingOverlay,
  ProgressBar,
  Stepper,
  Toast,
} from "@components";
import { useToast } from "@components/hooks/useToast";

import { messages } from "@constants/messages";

import { ProductSize } from "@enums/product-size";
import {
  determineNextStep,
  determinePreviousStep,
  RentABikeStep,
} from "@enums/rent-a-bike-step";
import { ProductType } from "@enums/product-type";
import { ToastType } from "@enums/toast-type";
import { Location } from "@enums/location";

import Product from "@models/product.model";

import {
  declassify,
  getMirroredImagePath,
  isNullOrUndefined,
} from "@utils/common";

import {
  useFadeInOutLeftVariants,
  useFadeInOutRightVariants,
  useFadeInOutTopVariants,
  useFadeInOutVariants,
} from "@animations";

import useFetchProductsByProductType from "@features/product/api/hooks/useFetchProductsByProductType";
import useFetchProductById from "@features/product/api/hooks/useFetchProductById";

import styles from "./rent-a-bike.module.scss";

const SelectGear = ({
  selectedHelmet,
  onSelectedHelmetChange,
  selectedSize,
  onSelectedSizeChange,
}) => {
  const [helmets, setHelmets] = useState<Product[]>();

  const { data, refetch } = useFetchProductsByProductType(ProductType.HELMET);

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    setHelmets(data?.data);
  }, [data]);

  return (
    <div>
      <div className="mt-4">
        <p className="font-medium text-2xl">Select a helmet</p>
        <div className="mt-4 flex justify-start space-x-8">
          {helmets?.map((product, index) => (
            <Card
              key={index}
              className="text-black p-4 w-36 flex items-start justify-center cursor-pointer hover:scale-105"
              isSelected={selectedHelmet?.idProduct === product?.idProduct}
              onClick={() => onSelectedHelmetChange(product)}
            >
              <Image
                src={product?.imagePath}
                alt="Register illustration"
                width={110}
                height={110}
                priority
              />
            </Card>
          ))}
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
  );
};

const ChooseLocation = ({ selectedLocation, setSelectedLocation }) => {
  return (
    <div className="mt-4">
      <p className="font-medium text-2xl">Choose location</p>
      <div
        className={`${styles.locations_container} mt-4 pr-8 space-y-4 w-4/5 overflow-y-scroll overflow-x-hidden`}
      >
        <Card
          className="pt-3 pl-5 pb-3 flex items-center hover:cursor-pointer"
          isSelected={selectedLocation === Location.AUSTIN}
          onClick={() => setSelectedLocation(Location.AUSTIN)}
        >
          <div className="w-6 h-6 p-5 rounded-2xl bg_primary flex items-center justify-center">
            <Icon className="text-white text-2xl las la-map-pin" />
          </div>
          <div className="text-black ml-4 flex-col">
            <p className="font-semibold text-lg leading-6">Austin</p>
            <p className="font-thin leading-5">
              35 miles from current location
            </p>
          </div>
          <div
            className={declassify(
              `w-4 h-4 p-5 rounded-full bg_primary flex items-center justify-center ml-auto mr-5`,
              { visible: selectedLocation === Location.AUSTIN },
              { invisible: selectedLocation !== Location.AUSTIN }
            )}
          >
            <Icon className="text-white text-lg las la-check" />
          </div>
        </Card>
        <Card
          className="pt-3 pl-5 pb-3 flex items-center hover:cursor-pointer"
          isSelected={selectedLocation === Location.BOSTON}
          onClick={() => setSelectedLocation(Location.BOSTON)}
        >
          <div className="w-6 h-6 p-5 rounded-2xl bg_primary flex items-center justify-center">
            <Icon className="text-white text-2xl las la-map-pin" />
          </div>
          <div className="text-black ml-4 flex-col">
            <p className="font-semibold text-lg leading-6">Boston</p>
            <p className="font-thin leading-5">
              47 miles from current location
            </p>
          </div>
          <div
            className={declassify(
              `w-4 h-4 p-5 rounded-full bg_primary flex items-center justify-center ml-auto mr-5`,
              { visible: selectedLocation === Location.BOSTON },
              { invisible: selectedLocation !== Location.BOSTON }
            )}
          >
            <Icon className="text-white text-lg las la-check" />
          </div>
        </Card>
        <Card
          className="pt-3 pl-5 pb-3 flex items-center hover:cursor-pointer"
          isSelected={selectedLocation === Location.NEW_YORK}
          onClick={() => setSelectedLocation(Location.NEW_YORK)}
        >
          <div className="w-6 h-6 p-5 rounded-2xl bg_primary flex items-center justify-center">
            <Icon className="text-white text-2xl las la-map-pin" />
          </div>
          <div className="text-black ml-4 flex-col">
            <p className="font-semibold text-lg leading-6">New York</p>
            <p className="font-thin leading-5">4 miles from current location</p>
          </div>
          <div
            className={declassify(
              `w-4 h-4 p-5 rounded-full bg_primary flex items-center justify-center ml-auto mr-5`,
              { visible: selectedLocation === Location.NEW_YORK },
              { invisible: selectedLocation !== Location.NEW_YORK }
            )}
          >
            <Icon className="text-white text-lg las la-check" />
          </div>
        </Card>
        <Card
          className="pt-3 pl-5 pb-3 flex items-center hover:cursor-pointer"
          isSelected={selectedLocation === Location.TAOS}
          onClick={() => setSelectedLocation(Location.TAOS)}
        >
          <div className="w-6 h-6 p-5 rounded-2xl bg_primary flex items-center justify-center">
            <Icon className="text-white text-2xl las la-map-pin" />
          </div>
          <div className="text-black ml-4 flex-col">
            <p className="font-semibold text-lg leading-6">Taos</p>
            <p className="font-thin leading-5">
              14 miles from current location
            </p>
          </div>
          <div
            className={declassify(
              `w-4 h-4 p-5 rounded-full bg_primary flex items-center justify-center ml-auto mr-5`,
              { visible: selectedLocation === Location.TAOS },
              { invisible: selectedLocation !== Location.TAOS }
            )}
          >
            <Icon className="text-white text-lg las la-check" />
          </div>
        </Card>
        <Card
          className="pt-3 pl-5 pb-3 flex items-center hover:cursor-pointer"
          isSelected={selectedLocation === Location.MADISON}
          onClick={() => setSelectedLocation(Location.MADISON)}
        >
          <div className="w-6 h-6 p-5 rounded-2xl bg_primary flex items-center justify-center">
            <Icon className="text-white text-2xl las la-map-pin" />
          </div>
          <div className="text-black ml-4 flex-col">
            <p className="font-semibold text-lg leading-6">Madison</p>
            <p className="font-thin leading-5">
              12 miles from current location
            </p>
          </div>
          <div
            className={declassify(
              `w-4 h-4 p-5 rounded-full bg_primary flex items-center justify-center ml-auto mr-5`,
              { visible: selectedLocation === Location.MADISON },
              { invisible: selectedLocation !== Location.MADISON }
            )}
          >
            <Icon className="text-white text-lg las la-check" />
          </div>
        </Card>
        <Card
          className="pt-3 pl-5 pb-3 flex items-center hover:cursor-pointer"
          isSelected={selectedLocation === Location.SAVANNAH}
          onClick={() => setSelectedLocation(Location.SAVANNAH)}
        >
          <div className="w-6 h-6 p-5 rounded-2xl bg_primary flex items-center justify-center">
            <Icon className="text-white text-2xl las la-map-pin" />
          </div>
          <div className="text-black ml-4 flex-col">
            <p className="font-semibold text-lg leading-6">Savannah</p>
            <p className="font-thin leading-5">
              56 miles from current location
            </p>
          </div>
          <div
            className={declassify(
              `w-4 h-4 p-5 rounded-full bg_primary flex items-center justify-center ml-auto mr-5`,
              { visible: selectedLocation === Location.SAVANNAH },
              { invisible: selectedLocation !== Location.SAVANNAH }
            )}
          >
            <Icon className="text-white text-lg las la-check" />
          </div>
        </Card>
        <Card
          className="pt-3 pl-5 pb-3 flex items-center hover:cursor-pointer"
          isSelected={selectedLocation === Location.NASHVILLE}
          onClick={() => setSelectedLocation(Location.NASHVILLE)}
        >
          <div className="w-6 h-6 p-5 rounded-2xl bg_primary flex items-center justify-center">
            <Icon className="text-white text-2xl las la-map-pin" />
          </div>
          <div className="text-black ml-4 flex-col">
            <p className="font-semibold text-lg leading-6">Nashville</p>
            <p className="font-thin leading-5">
              19 miles from current location
            </p>
          </div>
          <div
            className={declassify(
              `w-4 h-4 p-5 rounded-full bg_primary flex items-center justify-center ml-auto mr-5`,
              { visible: selectedLocation === Location.NASHVILLE },
              { invisible: selectedLocation !== Location.NASHVILLE }
            )}
          >
            <Icon className="text-white text-lg las la-check" />
          </div>
        </Card>
      </div>
    </div>
  );
};

const PickupDate = ({ selectedDate, setSelectedDate }) => {
  return (
    <div className="mt-4">
      <p className="font-medium text-2xl">Pickup date and time</p>
      <div className="mt-4">
        <DatePickerStripe
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>
    </div>
  );
};

const RentEBike = () => {
  const router = useRouter();
  const [isShown, setIsShown] = useToast({ duration: 4000 });

  const { id: idProduct } = router?.query;

  const [selectedBike, setSelectedBike] = useState<Product>();
  const [selectedHelmet, setSelectedHelmet] = useState<Product>();
  const [selectedSize, setSelectedSize] = useState<ProductSize>();
  const [selectedLocation, setSelectedLocation] = useState<Location>();
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [currentStep, setCurrentStep] = useState<RentABikeStep>(
    RentABikeStep.SELECT_GEAR
  );

  const { isLoading, isError, data, error, refetch } = useFetchProductById(
    idProduct as string
  );

  useEffect(() => {
    if (router?.isReady) {
      refetch();
    }
  }, [router.isReady]);

  useEffect(() => {
    setSelectedBike(data?.data);
  }, [data]);

  const navigateToPreviousPage = () => {
    router.back();
  };

  useEffect(() => {
    setIsShown(isError);
  }, [isError]);

  const calcluateProgressBarValue = (
    value: number,
    comparativeValue: number
  ): number => {
    return Math.round((value / comparativeValue) * 100);
  };

  const onSelectedHelmetChange = (helmet: Product): void => {
    setSelectedHelmet(helmet);
  };

  const onSelectedSizeChange = (size: ProductSize): void => {
    setSelectedSize(size);
  };

  const onLocationChange = (location: Location): void => {
    setSelectedLocation(location);
  };

  const onNextButtonClick = (): void => {
    setCurrentStep(determineNextStep(currentStep));
  };

  const onPreviousButtonClick = (): void => {
    setCurrentStep(determinePreviousStep(currentStep));
  };

  const iseNextButtonDisabled = (): boolean => {
    return isNullOrUndefined(selectedHelmet) || isNullOrUndefined(selectedSize);
  };

  const isPreviousButtonHidden = (): boolean => {
    return currentStep === RentABikeStep.SELECT_GEAR;
  };

  if (isLoading) return <LoadingOverlay />;

  return (
    <div className="h-full">
      <Header animated showMenu backgroundColor="split" />
      <div className="grid grid-cols-2 text-white">
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
        <div className={`${styles.h_full} bg_primary overflow-hidden`}>
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={useFadeInOutVariants({ duration: 0.5 })}
          >
            <BackIcon
              className="flex justify-end mt-4 mr-12"
              onClick={navigateToPreviousPage}
            />
          </motion.div>
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={useFadeInOutVariants({ duration: 0.5 })}
            className="ml-12 max-w-xl"
          >
            <p className=" text-6xl font_secondary">{`${selectedBike?.name}. ${selectedBike?.model}`}</p>
            <p className="text-4xl mt-2">{selectedBike?.description}</p>
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={useFadeInOutLeftVariants({ duration: 0.5, delay: 0.5 })}
            >
              <span className="mt-6 flex">
                <p className="text-3xl font_secondary">
                  ${selectedBike?.rentPricePerHour}
                </p>
                <p className="self-end mb-1 ml-1">/ hour</p>
              </span>
              <Card className="p-4 pl-6 pr-6 mt-6 w-48 h-32 text-black ">
                <p className="text-xl font-light">{`${selectedBike?.assistSpeed} km/h`}</p>
                <p className="text-gray text-sm font-thin">Assist Speed</p>
                <ProgressBar
                  value={calcluateProgressBarValue(
                    selectedBike?.assistSpeed!,
                    35
                  )}
                />
              </Card>
              <Card className="p-4 pl-6 pr-6 mt-6 w-48 h-32 text-black ">
                <p className="text-xl font-light">{`${selectedBike?.batteryRange} km`}</p>
                <p className="text-gray text-sm font-thin">Battery Range</p>
                <ProgressBar
                  value={calcluateProgressBarValue(
                    selectedBike?.batteryRange!,
                    100
                  )}
                />
              </Card>
              <Card className="p-4 pl-6 pr-6 mt-6 w-48 h-32 text-black ">
                <p className="text-xl font-light">{`${selectedBike?.weight} kg`}</p>
                <p className="text-gray text-sm font-thin">Weight</p>
                <ProgressBar
                  value={calcluateProgressBarValue(selectedBike?.weight!, 22.4)}
                />
              </Card>
            </motion.div>
          </motion.div>
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={useFadeInOutRightVariants({ duration: 0.5, delay: 0.5 })}
            className={`relative ${styles.mirrored_image_position}`}
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
        </div>
        <div className={`${styles.h_full} bg_brown`}>
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={useFadeInOutTopVariants({ duration: 0.5, delay: 0.5 })}
          >
            <Stepper className="pt-8" currentStep={currentStep!} />
          </motion.div>
          <motion.div
            key={currentStep}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={useFadeInOutRightVariants({ duration: 0.5, delay: 0.5 })}
            className="px-12 py-8"
          >
            {currentStep === RentABikeStep.SELECT_GEAR && (
              <SelectGear
                selectedHelmet={selectedHelmet}
                onSelectedHelmetChange={onSelectedHelmetChange}
                selectedSize={selectedSize}
                onSelectedSizeChange={onSelectedSizeChange}
              />
            )}
            {currentStep === RentABikeStep.CHOOSE_LOCATION && (
              <ChooseLocation
                selectedLocation={selectedLocation}
                setSelectedLocation={onLocationChange}
              />
            )}
            {currentStep === RentABikeStep.PICKUP_DATE && (
              <PickupDate
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
            )}
          </motion.div>
          <Button
            label="Previous"
            prependIcon="las la-arrow-left"
            className={`absolute w-32 mb-6 ml-12 ${styles.previous_button}`}
            isHidden={isPreviousButtonHidden()}
            onClick={() => onPreviousButtonClick()}
          />
          <Button
            label="Next"
            appendIcon="las la-arrow-right"
            className={`absolute w-32 mb-6 mr-12 ${styles.next_button}`}
            isDisabled={iseNextButtonDisabled()}
            onClick={() => onNextButtonClick()}
          />
        </div>
      </div>
    </div>
  );
};

export default RentEBike;
