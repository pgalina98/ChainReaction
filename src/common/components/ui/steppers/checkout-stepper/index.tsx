import React from "react";

import { declassify } from "@utils/common";
import { CheckoutStep } from "@enums/checkout-step";

interface StepperProps {
  className?: string;
  currentStep: CheckoutStep;
}

const CheckoutStepper = ({
  className,
  currentStep = CheckoutStep.DELIVERY_DETAILS,
}: StepperProps) => {
  return (
    <div className={`${className} w-full`}>
      <div className="flex">
        <div className="w-1/4">
          <div className="relative mb-2">
            <div className="w-10 h-10 mx-auto bg-green-500 rounded-full text-lg text-white flex items-center">
              <span className="text-center text-white w-full">
                <i className="las la-shipping-fast text-2xl" />
              </span>
            </div>
          </div>

          <div className="text-xs text-center md:text-base">
            Delivery Details
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
                    "w-1/3": currentStep === CheckoutStep.DELIVERY_DETAILS,
                    "w-auto": currentStep !== CheckoutStep.DELIVERY_DETAILS,
                  })}
                />
              </div>
            </div>

            <div
              className={`w-10 h-10 mx-auto ${
                currentStep >= CheckoutStep.PAYMENT_METHOD
                  ? "bg-green-500 text-white"
                  : "bg-white border-2 border-gray-200 text-gray-600"
              } rounded-full text-lg flex items-center`}
            >
              <span className="text-center w-full">
                <i className="las la-wallet text-2xl" />
              </span>
            </div>
          </div>

          <div className="text-xs text-center md:text-base">Payment Method</div>
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
                    "w-1/3": currentStep === CheckoutStep.PAYMENT_METHOD,
                    "w-auto":
                      currentStep !== CheckoutStep.DELIVERY_DETAILS &&
                      currentStep !== CheckoutStep.PAYMENT_METHOD,
                  })}
                ></div>
              </div>
            </div>

            <div
              className={`w-10 h-10 mx-auto ${
                currentStep >= CheckoutStep.DISCOUNT_CODE
                  ? "bg-green-500 text-white"
                  : "bg-white border-2 border-gray-200 text-gray-600"
              } rounded-full text-lg flex items-center`}
            >
              <span className="text-center w-full">
                <i className="las la-tag text-2xl" />
              </span>
            </div>
          </div>

          <div className="text-xs text-center md:text-base">Discount Code</div>
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
                    "w-1/3": currentStep === CheckoutStep.DISCOUNT_CODE,
                    "w-auto":
                      currentStep !== CheckoutStep.DELIVERY_DETAILS &&
                      currentStep !== CheckoutStep.PAYMENT_METHOD &&
                      currentStep !== CheckoutStep.DISCOUNT_CODE,
                  })}
                ></div>
              </div>
            </div>

            <div
              className={`w-10 h-10 mx-auto ${
                currentStep >= CheckoutStep.CART_SUMMARY
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

export default CheckoutStepper;
