import React from "react";

import { RentABikeStep } from "@enums/rent-a-bike-step";

import { declassify } from "@utils/common";

interface StepperProps {
  className?: string;
  currentStep: RentABikeStep;
}

const Stepper = ({
  className,
  currentStep = RentABikeStep.SELECT_GEAR,
}: StepperProps) => {
  return (
    <div className={`${className} w-full`}>
      <div className="flex">
        <div className="w-1/4">
          <div className="relative mb-2">
            <div className="w-10 h-10 mx-auto bg-green-500 rounded-full text-lg text-white flex items-center">
              <span className="text-center text-white w-full">
                <i className="las la-sliders-h text-xl" />
              </span>
            </div>
          </div>

          <div className="text-xs text-center md:text-base">Select Gear</div>
        </div>

        <div className="w-1/4">
          <div className="relative mb-2">
            <div
              className="absolute flex align-center items-center align-middle content-center"
              style={{
                width: "calc(100% - 2.5rem - 1rem)",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                <div
                  className={declassify(`w-0 bg-green-300 py-1 rounded`, {
                    "w-1/3": currentStep === RentABikeStep.SELECT_GEAR,
                    "w-auto": currentStep !== RentABikeStep.SELECT_GEAR,
                  })}
                />
              </div>
            </div>

            <div
              className={`w-10 h-10 mx-auto ${
                currentStep >= RentABikeStep.CHOOSE_LOCATION
                  ? "bg-green-500 text-white"
                  : "bg-white border-2 border-gray-200 text-gray-600"
              } rounded-full text-lg flex items-center`}
            >
              <span className="text-center w-full">
                <i className="las la-map-marked-alt text-2xl" />
              </span>
            </div>
          </div>

          <div className="text-xs text-center md:text-base">
            Choose Location
          </div>
        </div>

        <div className="w-1/4">
          <div className="relative mb-2">
            <div
              className="absolute flex align-center items-center align-middle content-center"
              style={{
                width: "calc(100% - 2.5rem - 1rem)",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                <div
                  className={declassify(`w-0 bg-green-300 py-1 rounded`, {
                    "w-1/3": currentStep === RentABikeStep.CHOOSE_LOCATION,
                    "w-auto":
                      currentStep !== RentABikeStep.SELECT_GEAR &&
                      currentStep !== RentABikeStep.CHOOSE_LOCATION,
                  })}
                ></div>
              </div>
            </div>

            <div
              className={`w-10 h-10 mx-auto ${
                currentStep >= RentABikeStep.PICKUP_DATE
                  ? "bg-green-500 text-white"
                  : "bg-white border-2 border-gray-200 text-gray-600"
              } rounded-full text-lg flex items-center`}
            >
              <span className="text-center w-full">
                <i className="las la-calendar-day text-2xl" />
              </span>
            </div>
          </div>

          <div className="text-xs text-center md:text-base">Pickup Date</div>
        </div>

        <div className="w-1/4">
          <div className="relative mb-2">
            <div
              className="absolute flex align-center items-center align-middle content-center"
              style={{
                width: "calc(100% - 2.5rem - 1rem)",
                top: "50%",
                transform: " translate(-50%, -50%)",
              }}
            >
              <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                <div
                  className={declassify(`w-0 bg-green-300 py-1 rounded`, {
                    "w-1/3": currentStep === RentABikeStep.PICKUP_DATE,
                    "w-auto":
                      currentStep !== RentABikeStep.SELECT_GEAR &&
                      currentStep !== RentABikeStep.CHOOSE_LOCATION &&
                      currentStep !== RentABikeStep.PICKUP_DATE,
                  })}
                ></div>
              </div>
            </div>

            <div
              className={`w-10 h-10 mx-auto ${
                currentStep >= RentABikeStep.CONFIRM_RENT
                  ? "bg-green-500 text-white"
                  : "bg-white border-2 border-gray-200 text-gray-600"
              } rounded-full text-lg flex items-center`}
            >
              <span className="text-center w-full">
                <i className="las la-check text-xl" />
              </span>
            </div>
          </div>

          <div className="text-xs text-center md:text-base">Confirm</div>
        </div>
      </div>
    </div>
  );
};

export default Stepper;
