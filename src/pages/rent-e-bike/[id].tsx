import React, { useEffect, useState } from "react";

import Image from "next/image";
import { useRouter } from "next/router";

import {
  BackIcon,
  Button,
  Card,
  Header,
  LoadingOverlay,
  ProgressBar,
  Stepper,
  Toast,
} from "@components";
import { useToast } from "@components/hooks/useToast";

import { messages } from "@constants/messages";

import { ProductSize } from "@enums/product-size";
import { RentABikeStep, RentABikeSteps } from "@enums/rent-a-bike-step";
import { ProductType } from "@enums/product-type";
import { ToastType } from "@enums/toast-type";

import Product from "@models/product.model";

import { getMirroredImagePath, isNullOrUndefined } from "@utils/common";

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

  const { isLoading, isError, isSuccess, data, error, refetch } = useFetchProductsByProductType(
    ProductType.HELMET
  );

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

const RentEBike = () => {
  const router = useRouter();
  const [isShown, setIsShown] = useToast({ duration: 4000 });

  const { id: idProduct } = router?.query;

  const [selectedBike, setSelectedBike] = useState<Product>();
  const [selectedHelmet, setSelectedHelmet] = useState<Product>();
  const [selectedSize, setSelectedSize] = useState<ProductSize>();
  const [currentStep, setCurrentStep] = useState<RentABikeStep>(RentABikeStep.SELECT_GEAR);

  const { isLoading, isError, isSuccess, data, error, refetch } = useFetchProductById(
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

  const calcluateProgressBarValue = (value: number, comparativeValue: number): number => {
    return Math.round((value / comparativeValue) * 100);
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

  if (isLoading) return <LoadingOverlay />;

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
        <div className={`${styles.h_full} bg_primary overflow-hidden`}>
          <BackIcon className="flex justify-end mt-4 mr-12" onClick={navigateToPreviousPage} />
          <div className="ml-12 max-w-xl">
            <p className=" text-6xl font_secondary">{`${selectedBike?.name}. ${selectedBike?.model}`}</p>
            <p className="text-4xl mt-2">{selectedBike?.description}</p>
            <span className="mt-6 flex">
              <p className="text-3xl font_secondary">$5</p>
              <p className="self-end mb-1 ml-1">/ hour</p>
            </span>
            <Card className="p-4 pl-6 pr-6 mt-6 w-48 h-32 text-black ">
              <p className="text-xl font-light">{`${selectedBike?.assistSpeed} km/h`}</p>
              <p className="text-gray text-sm font-thin">Assist Speed</p>
              <ProgressBar value={calcluateProgressBarValue(selectedBike?.assistSpeed!, 35)} />
            </Card>
            <Card className="p-4 pl-6 pr-6 mt-6 w-48 h-32 text-black ">
              <p className="text-xl font-light">{`${selectedBike?.batteryRange} km`}</p>
              <p className="text-gray text-sm font-thin">Battery Range</p>
              <ProgressBar value={calcluateProgressBarValue(selectedBike?.batteryRange!, 100)} />
            </Card>
            <Card className="p-4 pl-6 pr-6 mt-6 w-48 h-32 text-black ">
              <p className="text-xl font-light">{`${selectedBike?.weight} kg`}</p>
              <p className="text-gray text-sm font-thin">Weight</p>
              <ProgressBar value={calcluateProgressBarValue(selectedBike?.weight!, 22.4)} />
            </Card>
          </div>
          <div className={`relative ${styles.mirrored_image_position}`}>
            {selectedBike?.imagePath && (
              <Image
                src={getMirroredImagePath(selectedBike?.imagePath!)}
                alt="Cowboy 4"
                width={1920}
                height={1064}
                priority
              />
            )}
          </div>
        </div>
        <div className={`${styles.h_full} bg_brown`}>
          <Stepper className="pt-8" currentStep={currentStep!} />
          <div className="px-12 py-8">
            <SelectGear
              selectedHelmet={selectedHelmet}
              onSelectedHelmetChange={onSelectedHelmetChange}
              selectedSize={selectedSize}
              onSelectedSizeChange={onSelectedSizeChange}
            />
          </div>
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