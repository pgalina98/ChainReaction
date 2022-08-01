import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";

import { Dayjs } from "dayjs";

import dayjs from "@utils/dayjs";

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
  Loader,
  LoadingOverlay,
  ProgressBar,
  Stepper,
  Toast,
} from "@components";
import { useToast } from "@components/hooks/useToast";

import { messages } from "@constants/messages";

import { getProductSizeValue, ProductSize } from "@enums/product-size";
import {
  determineNextStep,
  determinePreviousStep,
  RentABikeStep,
} from "@enums/rent-a-bike-step";
import { ProductType } from "@enums/product-type";
import { ToastType } from "@enums/toast-type";
import { getLocation, Location } from "@enums/location";

import Product from "@models/product.model";
import Rent, { createEmptyRentFormObject } from "@models/rent.model";

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

import useFetchProductsByProductType from "@features/order/api/hooks/useFetchProductsByProductType";
import useFetchProductById from "@features/order/api/hooks/useFetchProductById";
import useFetchAvailableTimeslots from "@features/rent/api/hooks/useFetchAvailableTimeslots";
import useSaveRent from "@features/rent/api/hooks/useSaveRent";

import styles from "./rent-a-bike.module.scss";

const SelectGear = ({
  selectedHelmet,
  onSelectedHelmetChange,
  selectedSize,
  onSelectedSizeChange,
}) => {
  const [helmets, setHelmets] = useState<Product[]>();

  const { isLoading, data, refetch } = useFetchProductsByProductType(
    ProductType.HELMET
  );

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    setHelmets(data?.data);
  }, [data]);

  if (isLoading) return <Loader withLabel={false} />;

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
        className={`${styles.locations_container} mt-4 pr-8 space-y-4 w-full overflow-y-scroll overflow-x-hidden`}
      >
        <Card
          className="pt-3 pl-5 pb-3 flex items-center hover:cursor-pointer"
          withCheckIcon={false}
          isSelected={selectedLocation?.idLocation === Location.AUSTIN}
          onClick={() => setSelectedLocation(Location.AUSTIN)}
        >
          <div className="w-6 h-6 p-5 rounded-2xl bg_primary flex items-center justify-center">
            <Icon className="text-white text-2xl" icon="las la-map-pin" />
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
              { visible: selectedLocation?.idLocation === Location.AUSTIN },
              { invisible: selectedLocation?.idLocation !== Location.AUSTIN }
            )}
          >
            <Icon className="text-white text-lg" icon="las la-check" />
          </div>
        </Card>
        <Card
          className="pt-3 pl-5 pb-3 flex items-center hover:cursor-pointer"
          withCheckIcon={false}
          isSelected={selectedLocation?.idLocation === Location.BOSTON}
          onClick={() => setSelectedLocation(Location.BOSTON)}
        >
          <div className="w-6 h-6 p-5 rounded-2xl bg_primary flex items-center justify-center">
            <Icon className="text-white text-2xl" icon="las la-map-pin" />
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
              { visible: selectedLocation?.idLocation === Location.BOSTON },
              { invisible: selectedLocation?.idLocation !== Location.BOSTON }
            )}
          >
            <Icon className="text-white text-lg" icon="las la-check" />
          </div>
        </Card>
        <Card
          className="pt-3 pl-5 pb-3 flex items-center hover:cursor-pointer"
          withCheckIcon={false}
          isSelected={selectedLocation?.idLocation === Location.NEW_YORK}
          onClick={() => setSelectedLocation(Location.NEW_YORK)}
        >
          <div className="w-6 h-6 p-5 rounded-2xl bg_primary flex items-center justify-center">
            <Icon className="text-white text-2xl" icon="las la-map-pin" />
          </div>
          <div className="text-black ml-4 flex-col">
            <p className="font-semibold text-lg leading-6">New York</p>
            <p className="font-thin leading-5">4 miles from current location</p>
          </div>
          <div
            className={declassify(
              `w-4 h-4 p-5 rounded-full bg_primary flex items-center justify-center ml-auto mr-5`,
              { visible: selectedLocation?.idLocation === Location.NEW_YORK },
              { invisible: selectedLocation?.idLocation !== Location.NEW_YORK }
            )}
          >
            <Icon className="text-white text-lg" icon="las la-check" />
          </div>
        </Card>
        <Card
          className="pt-3 pl-5 pb-3 flex items-center hover:cursor-pointer"
          withCheckIcon={false}
          isSelected={selectedLocation?.idLocation === Location.TAOS}
          onClick={() => setSelectedLocation(Location.TAOS)}
        >
          <div className="w-6 h-6 p-5 rounded-2xl bg_primary flex items-center justify-center">
            <Icon className="text-white text-2xl" icon="las la-map-pin" />
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
              { visible: selectedLocation?.idLocation === Location.TAOS },
              { invisible: selectedLocation?.idLocation !== Location.TAOS }
            )}
          >
            <Icon className="text-white text-lg" icon="las la-check" />
          </div>
        </Card>
        <Card
          className="pt-3 pl-5 pb-3 flex items-center hover:cursor-pointer"
          withCheckIcon={false}
          isSelected={selectedLocation?.idLocation === Location.MADISON}
          onClick={() => setSelectedLocation(Location.MADISON)}
        >
          <div className="w-6 h-6 p-5 rounded-2xl bg_primary flex items-center justify-center">
            <Icon className="text-white text-2xl" icon="las la-map-pin" />
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
              { visible: selectedLocation?.idLocation === Location.MADISON },
              { invisible: selectedLocation?.idLocation !== Location.MADISON }
            )}
          >
            <Icon className="text-white text-lg" icon="las la-check" />
          </div>
        </Card>
        <Card
          className="pt-3 pl-5 pb-3 flex items-center hover:cursor-pointer"
          withCheckIcon={false}
          isSelected={selectedLocation?.idLocation === Location.SAVANNAH}
          onClick={() => setSelectedLocation(Location.SAVANNAH)}
        >
          <div className="w-6 h-6 p-5 rounded-2xl bg_primary flex items-center justify-center">
            <Icon className="text-white text-2xl" icon="las la-map-pin" />
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
              { visible: selectedLocation?.idLocation === Location.SAVANNAH },
              { invisible: selectedLocation?.idLocation !== Location.SAVANNAH }
            )}
          >
            <Icon className="text-white text-lg" icon="las la-check" />
          </div>
        </Card>
        <Card
          className="pt-3 pl-5 pb-3 flex items-center hover:cursor-pointer"
          withCheckIcon={false}
          isSelected={selectedLocation?.idLocation === Location.NASHVILLE}
          onClick={() => setSelectedLocation(Location.NASHVILLE)}
        >
          <div className="w-6 h-6 p-5 rounded-2xl bg_primary flex items-center justify-center">
            <Icon className="text-white text-2xl" icon="las la-map-pin" />
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
              { visible: selectedLocation?.idLocation === Location.NASHVILLE },
              { invisible: selectedLocation?.idLocation !== Location.NASHVILLE }
            )}
          >
            <Icon className="text-white text-lg" icon="las la-check" />
          </div>
        </Card>
      </div>
    </div>
  );
};

const PickupDate = ({
  idProduct,
  selectedLocation,
  selectedDate,
  setSelectedDate,
  selectedTimeslots,
  setSelectedTimeslots,
}) => {
  const [availableTimeslots, setAvailableTimeslots] = useState<string[]>();

  const { isLoading, data, refetch } = useFetchAvailableTimeslots(
    idProduct,
    selectedLocation?.idLocation,
    selectedDate
  );

  useEffect(() => {
    refetch();
  }, [selectedDate]);

  useEffect(() => {
    setAvailableTimeslots(data?.data);
  }, [data]);

  const isTimeslotSelected = (timeslot: Dayjs): boolean => {
    return (
      selectedTimeslots.filter(
        (selectedTimeslot: Dayjs) =>
          selectedTimeslot.isSame(timeslot, "dates") &&
          selectedTimeslot.isSame(timeslot, "hour")
      ).length > 0
    );
  };

  const onSelectedTimeslotChange = (timeslot: Dayjs): void => {
    if (isTimeslotSelected(timeslot)) {
      setSelectedTimeslots(
        selectedTimeslots.filter(
          (selectedTimeslot: Dayjs) =>
            selectedTimeslot.isSame(timeslot, "dates") &&
            !selectedTimeslot.isSame(timeslot, "hour")
        )
      );
    } else {
      setSelectedTimeslots([...selectedTimeslots, timeslot]);
    }
  };

  if (isLoading) return <Loader withLabel={false} />;

  return (
    <div className="mt-4">
      <p className="font-medium text-2xl">Pickup date and time</p>
      <div className="mt-4">
        <DatePickerStripe
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <div className="flex mt-12 space-x-8 overflow-x-scroll pb-4">
          {availableTimeslots?.map((timeslot, index) => (
            <DateTimeCard
              key={index}
              className="cursor-pointer"
              date={selectedDate}
              timeslot={dayjs(timeslot)}
              isSelected={isTimeslotSelected(dayjs(timeslot))}
              onClick={onSelectedTimeslotChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const RentSummary = ({ rentForm }) => {
  const calculateSubtotal = (): number => {
    return rentForm.product.rentPricePerHour * rentForm.timeslots.length;
  };

  const calculateTotal = (): number => {
    return rentForm.product.rentPricePerHour * rentForm.timeslots.length;
  };

  return (
    <div className="mt-4">
      <p className="font-medium text-2xl">Confirm rent</p>
      <div className="mt-4">
        <div className="flex flex-col bg_white rounded-2xl shadow-xl h-auto pl-8 pr-8 pt-6 pb-6">
          <div className="flex">
            <div className="w-24">
              <Image
                src={getMirroredImagePath(rentForm.product?.imagePath!)}
                alt="Cowboy 4"
                width={90}
                height={50}
                priority
              />
            </div>
            <div className="text-black ml-6 self-center">
              <div className="flex items-center">
                <div className="text-lg font-medium">{`${rentForm.product.name} ${rentForm.product.model}`}</div>
                <div className="text-lg font-thin">
                  {`, ${rentForm.product.description}`}
                </div>
              </div>
              <div className="text-base font-thin">
                {rentForm.product.color.value}
              </div>
            </div>
            <div className="text-black text-xl font-medium ml-auto self-center">{`${rentForm.timeslots.length}h x ${rentForm.product.rentPricePerHour}$`}</div>
          </div>
          <div className="flex mt-8">
            <div className="w-24">
              <Image
                src={rentForm.helmet?.imagePath!}
                alt="Cowboy 4"
                width={65}
                height={65}
                priority
              />
            </div>
            <div className="text-black ml-6 self-center">
              <div className="flex items-center">
                <div className="text-lg font-medium">{`${rentForm.helmet.name} ${rentForm.helmet.model}`}</div>
                <div className="text-lg font-thin">
                  {`, ${getProductSizeValue(rentForm.helmetSize)}`}
                </div>
              </div>
              <div className="text-lg font-thin">
                {rentForm.helmet.color.value}
              </div>
            </div>
            <div className="text-black text-xl font-medium ml-auto self-center">
              0$
            </div>
          </div>
          <hr className="mt-4 mb-4" />
          <div className="flex">
            <div className="text-gray-600 text-lg">Subtotal</div>
            <div className="text-black text-xl font-medium ml-auto self-center">
              {`${calculateSubtotal()}$`}
            </div>
          </div>
          <hr className="mt-4 mb-4" />
          <div className="flex">
            <div className="text-black text-lg font-medium">Total</div>
            <div className="ml-auto self-center flex items-center">
              <div className="text-gray-500 font-thin text-sm mr-2">USD</div>
              <div className="text-black text-xl font-medium">
                {`${calculateTotal()}$`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RentEBike = () => {
  const router = useRouter();
  const [isShown, setIsShown] = useToast({ duration: 4000 });

  const { id: idProduct } = router?.query;

  const [selectedBike, setSelectedBike] = useState<Product>();
  const [rentForm, setRentForm] = useState<Rent>(createEmptyRentFormObject());
  const [currentStep, setCurrentStep] = useState<RentABikeStep>(
    RentABikeStep.SELECT_GEAR
  );

  const { isLoading, isError, data, error, refetch } = useFetchProductById(
    idProduct as string
  );
  const {
    isLoading: isSaving,
    isError: isSavingError,
    isSuccess: isSavingSuccess,
    error: savingError,
    mutate,
  } = useSaveRent(rentForm);

  useEffect(() => {
    if (router?.isReady) {
      refetch();
    }
  }, [router.isReady]);

  useEffect(() => {
    setSelectedBike(data?.data);
    setRentForm({ ...rentForm, product: data?.data });
  }, [data]);

  useEffect(() => {
    setIsShown(isError || isSavingSuccess);
  }, [isError, isSavingSuccess]);

  useEffect(() => {
    setIsShown(isSavingError);
  }, [isSavingError]);

  useEffect(() => {
    if (isSavingSuccess) {
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  }, [isSavingSuccess]);

  const navigateToPreviousPage = () => {
    router.back();
  };

  const calcluateProgressBarValue = (
    value: number,
    comparativeValue: number
  ): number => {
    return Math.round((value / comparativeValue) * 100);
  };

  const onHelmetChange = (helmet: Product): void => {
    setRentForm({ ...rentForm, helmet });
  };

  const onSizeChange = (helmetSize: ProductSize): void => {
    setRentForm({ ...rentForm, helmetSize });
  };

  const onLocationChange = (location: Location): void => {
    setRentForm({ ...rentForm, location: getLocation(location)! });
  };

  const onDateChange = (date: Dayjs): void => {
    setRentForm({ ...rentForm, date, timeslots: [] });
  };

  const onTimeslotsChange = (timeslots: Dayjs[]): void => {
    setRentForm({ ...rentForm, timeslots });
  };

  const onNextButtonClick = (): void => {
    setCurrentStep(determineNextStep(currentStep));
  };

  const onPreviousButtonClick = (): void => {
    setCurrentStep(determinePreviousStep(currentStep));
  };

  const onConfirmButtonClick = (): void => {
    mutate();
  };

  const iseNextButtonDisabled = (): boolean => {
    return (
      ((isNullOrUndefined(rentForm?.helmet) ||
        isNullOrUndefined(rentForm?.helmetSize)) &&
        currentStep === RentABikeStep.SELECT_GEAR) ||
      (isNullOrUndefined(rentForm?.location) &&
        currentStep === RentABikeStep.CHOOSE_LOCATION) ||
      ((isNullOrUndefined(rentForm?.date) ||
        isNullOrUndefined(rentForm?.timeslots) ||
        rentForm?.timeslots.length === 0) &&
        currentStep === RentABikeStep.PICKUP_DATE)
    );
  };

  const isPreviousButtonHidden = (): boolean => {
    return currentStep === RentABikeStep.SELECT_GEAR;
  };

  const isNextButtonHidden = (): boolean => {
    return currentStep === RentABikeStep.RENT_SUMMARY;
  };

  const isConfirmButtonHidden = (): boolean => {
    return currentStep !== RentABikeStep.RENT_SUMMARY;
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
        {isSavingError && (
          <Toast
            type={ToastType.DANGER}
            message={
              savingError.response.data?.message ||
              messages.INTERNAL_SERVER_ERROR
            }
            isShown={isShown}
            hideToast={() => setIsShown(false)}
          />
        )}
        {isSavingSuccess && (
          <Toast
            type={ToastType.SUCCESS}
            message={messages.RENT_SUCCESSFULLY_CREATED}
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
                selectedHelmet={rentForm?.helmet}
                onSelectedHelmetChange={onHelmetChange}
                selectedSize={rentForm?.helmetSize}
                onSelectedSizeChange={onSizeChange}
              />
            )}
            {currentStep === RentABikeStep.CHOOSE_LOCATION && (
              <ChooseLocation
                selectedLocation={rentForm?.location}
                setSelectedLocation={onLocationChange}
              />
            )}
            {currentStep === RentABikeStep.PICKUP_DATE && (
              <PickupDate
                idProduct={idProduct}
                selectedLocation={rentForm?.location}
                selectedDate={rentForm?.date}
                setSelectedDate={onDateChange}
                selectedTimeslots={rentForm?.timeslots}
                setSelectedTimeslots={onTimeslotsChange}
              />
            )}
            {currentStep === RentABikeStep.RENT_SUMMARY && (
              <RentSummary rentForm={rentForm} />
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
            isHidden={isNextButtonHidden()}
            onClick={() => onNextButtonClick()}
          />
          <Button
            label="Confirm"
            appendIcon="las la-check"
            className={`absolute w-32 mb-6 mr-12 ${styles.next_button}`}
            isHidden={isConfirmButtonHidden()}
            isDisabled={isSaving}
            isLoading={isSaving}
            onClick={onConfirmButtonClick}
          />
        </div>
      </div>
    </div>
  );
};

export default RentEBike;
