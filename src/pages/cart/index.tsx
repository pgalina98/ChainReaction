import React, { useEffect, useState } from "react";

import { connect, useDispatch } from "react-redux";

import { alert } from "@constants/alert";

import { AlertType } from "@enums/alert-type";
import {
  CheckoutStep,
  determineNextStep,
  determinePreviousStep,
} from "@enums/checkout-step";

import { motion } from "framer-motion";

import { DeliveryType } from "@enums/delivery-type";
import { PaymentMethod } from "@enums/payment-method";

import OrderForm, {
  createEmptyOrderFormObject,
} from "@models/order/order.model";

import { RootState } from "@store/index";

import {
  declassify,
  isEmpty,
  isNullOrUndefined,
  toString,
} from "@utils/common";
import { calculateSubtotal, calculateTotal } from "@utils/cart";
import { formatNumberToCurrency } from "@utils/currency";
import {
  calculateExpressDeliveryArrivalDateRange,
  calculateStandardDeliveryArrivalDateRange,
} from "@utils/order";

import {
  useFadeInOutRightVariants,
  useFadeInOutTopVariants,
  useFadeInOutVariants,
} from "@animations";

import {
  Alert,
  Card,
  CartItem,
  CheckoutStepper,
  Header,
  Icon,
  Input,
  Loader,
  Radio,
} from "@components";
import authenticatedBoundaryRoute from "@components/hoc/route-guards/authenticatedBoundaryRoute";

import { clearCart, removeItem } from "@features/cart/cart-slice";
import { SHIPPING_COST } from "@features/cart/constants";
import {
  useValidateAddress,
  useValidateCity,
  useValidateFullname,
  useValidatePhoneNumber,
  useValidateZipCode,
} from "@features/registration/validators";

import styles from "./cart.module.scss";

const DeliveryDetails = ({
  orderForm,
  onFullnameChange,
  onPhoneNumberChange,
  onDeliveryTypeChange,
  onDeliveryAddressChange,
  setIsFormInvalid,
}) => {
  const [isDeliveryDetailsSectionOpen, setIsDeliveryDetailsSectionOpen] =
    useState<boolean>(false);

  return (
    <div>
      <div>
        <div className="text-xl font-thin">Contact informations</div>
        <div className="flex justify-between mt-4">
          <Input
            id="fullname"
            label="Full name"
            labelColor="text-white"
            placeholder="Enter full name"
            prependIcon="las la-id-card"
            value={orderForm?.buyer}
            onChange={onFullnameChange}
            validate
            validator={useValidateFullname}
            onValidationStateChange={(isInvalid: boolean) => {
              setIsFormInvalid(isInvalid);
            }}
          />
          <Input
            id="phoneNumber"
            label="Phone number"
            labelColor="text-white"
            placeholder="Enter phone number"
            prependIcon="las la-mobile"
            value={orderForm?.phoneNumber}
            onChange={onPhoneNumberChange}
            validate
            validator={useValidatePhoneNumber}
            onValidationStateChange={(isInvalid: boolean) => {
              setIsFormInvalid(isInvalid);
            }}
          />
        </div>
      </div>
      <div className="text-xl font-thin mt-8">Delivery informations</div>
      <div className="mt-4 flex items-center">
        <div
          className="flex items-center w-36 p-4 pl-5 pr-5 rounded-2xl bg_white hover:bg-gray-200 cursor-pointer"
          onClick={() => {
            onDeliveryTypeChange(DeliveryType.STORE);
            setIsDeliveryDetailsSectionOpen(false);
          }}
        >
          <div
            className={declassify(
              "p-1 pl-2 pr-2 rounded-full",
              {
                "bg-sky-500": orderForm?.deliveryType === DeliveryType.STORE,
              },
              { "bg-gray-400": orderForm?.deliveryType !== DeliveryType.STORE }
            )}
          >
            <Icon icon="las la-store text-xl" />
          </div>
          <div className="text-md text-black font-medium ml-2">Store</div>
        </div>
        <div
          className="flex items-center w-36 p-4 pl-5 pr-5 rounded-2xl bg_white hover:bg-gray-200 cursor-pointer ml-8"
          onClick={() => {
            onDeliveryTypeChange(DeliveryType.DHL_DELIVERY);
            setIsDeliveryDetailsSectionOpen(true);
          }}
        >
          <div
            className={declassify(
              "p-1 pl-2 pr-2 rounded-full",
              {
                "bg-sky-500":
                  orderForm?.deliveryType === DeliveryType.DHL_DELIVERY ||
                  orderForm?.deliveryType === DeliveryType.FED_EX_DELIVERY,
              },
              {
                "bg-gray-400":
                  orderForm?.deliveryType !== DeliveryType.DHL_DELIVERY &&
                  orderForm?.deliveryType !== DeliveryType.FED_EX_DELIVERY,
              }
            )}
          >
            <Icon icon="las la-shipping-fast text-xl" />
          </div>
          <div className="text-md text-black font-medium ml-2">Delivery</div>
        </div>
      </div>
      <motion.div
        key={toString(isDeliveryDetailsSectionOpen)}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={useFadeInOutVariants({ duration: 0.4 })}
        className={declassify("mt-6", {
          hidden:
            orderForm?.deliveryType === DeliveryType.STORE ||
            isNullOrUndefined(orderForm?.deliveryType),
        })}
      >
        <div className="flex item-center justify-between space-x-3">
          <Input
            id="city"
            label="City"
            labelColor="text-white"
            placeholder="Enter city name"
            prependIcon="las la-city"
            value={orderForm?.deliveryAddress?.city}
            onChange={(value) => onDeliveryAddressChange("city", value)}
            validate
            validator={useValidateCity}
            onValidationStateChange={(isInvalid: boolean) => {
              setIsFormInvalid(isInvalid);
            }}
          />
          <Input
            id="address"
            label="Address"
            labelColor="text-white"
            placeholder="Enter address"
            prependIcon="las la-map-marked-alt"
            value={orderForm?.deliveryAddress?.address}
            onChange={(value) => onDeliveryAddressChange("address", value)}
            validate
            validator={useValidateAddress}
            onValidationStateChange={(isInvalid: boolean) => {
              setIsFormInvalid(isInvalid);
            }}
          />
          <Input
            id="zipCode"
            label="ZIP code"
            labelColor="text-white"
            placeholder="Enter ZIP code"
            prependIcon="las la-archive"
            value={orderForm?.deliveryAddress?.zipCode}
            onChange={(value) => onDeliveryAddressChange("zipCode", value)}
            validate
            validator={useValidateZipCode}
            onValidationStateChange={(isInvalid: boolean) => {
              setIsFormInvalid(isInvalid);
            }}
          />
        </div>
        <div className="mt-6">
          <Radio
            helper="Deliver via DHL | $12"
            helperText={`Estimated delivery: ${calculateStandardDeliveryArrivalDateRange()}`}
            isChecked={orderForm?.deliveryType === DeliveryType.DHL_DELIVERY}
            onChange={() => {
              onDeliveryTypeChange(DeliveryType.DHL_DELIVERY);
            }}
          />
          <Radio
            className="mt-2"
            helper="Deliver via FedEx | $28"
            helperText={`Estimated delivery: ${calculateExpressDeliveryArrivalDateRange()}`}
            isChecked={orderForm?.deliveryType === DeliveryType.FED_EX_DELIVERY}
            onChange={() => {
              onDeliveryTypeChange(DeliveryType.FED_EX_DELIVERY);
            }}
          />
        </div>
      </motion.div>
    </div>
  );
};

const ChoosePaymentMethod = ({ orderForm, onPaymentMethodChange }) => {
  return (
    <div>
      <div className="text-xl font-thin">Choose payment method</div>
      <div className="mt-4">
        <Radio
          helper="Cash"
          helperText="Pay with Cash when package arrives."
          isChecked={orderForm?.paymentMethod === PaymentMethod.CASH}
          onChange={() => {
            onPaymentMethodChange(PaymentMethod.CASH);
          }}
        />
        <Radio
          className="mt-4"
          helper="Credit card"
          helperText="Pay with Credit card without additional fee."
          isChecked={orderForm?.paymentMethod === PaymentMethod.CREDIT_CART}
          onChange={() => {
            onPaymentMethodChange(PaymentMethod.CREDIT_CART);
          }}
        />
        <Radio
          className="mt-4"
          helper="PayPal"
          helperText="Pay with PayPal without additional fee."
          isChecked={orderForm?.paymentMethod === PaymentMethod.PAY_PAL}
          onChange={() => {
            onPaymentMethodChange(PaymentMethod.PAY_PAL);
          }}
        />
        <Radio
          className="mt-4"
          helper="Apple pay"
          helperText="Pay with Apple pay without additional fee."
          isChecked={orderForm?.paymentMethod === PaymentMethod.APPLE_PAY}
          onChange={() => {
            onPaymentMethodChange(PaymentMethod.APPLE_PAY);
          }}
        />
        <div className="mt-28">
          <Card className="p-4 pl-6 pr-6 text-black">
            <div className="text-base font-thin">
              Acceptable payment methods
            </div>
            <div className="mt-4 flex space-x-4">
              <Icon icon="las la-coins text-4xl" />
              <Icon icon="lab la-cc-visa text-4xl" />
              <Icon icon="lab la-cc-amex text-4xl" />
              <Icon icon="lab la-cc-diners-club text-4xl" />
              <Icon icon="lab la-cc-mastercard text-4xl" />
              <Icon icon="lab la-cc-paypal text-4xl" />
              <Icon icon="lab la-cc-apple-pay text-4xl" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

interface CartProps extends StateProps {}

const Cart = ({ authentication, cart }: CartProps) => {
  const dispatch = useDispatch();

  const [orderForm, setOrderForm] = useState<OrderForm>();
  const [isFormInvalid, setIsFormInvalid] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<CheckoutStep>(
    CheckoutStep.PAYMENT_METHOD
  );

  useEffect(() => {
    setOrderForm({
      ...createEmptyOrderFormObject(),
      idUser: authentication.id!,
    });
  }, []);

  const onFullnameChange = (fullname: string): void => {
    setOrderForm({ ...orderForm!, buyer: fullname });
  };

  const onPhoneNumberChange = (phoneNumber: string): void => {
    setOrderForm({ ...orderForm!, phoneNumber });
  };

  const onDeliveryTypeChange = (deliveryType: DeliveryType): void => {
    setOrderForm({ ...orderForm!, deliveryType });
  };

  const onDeliveryAddressChange = (key: string, value: string): void => {
    setOrderForm({
      ...orderForm!,
      deliveryAddress: { ...orderForm?.deliveryAddress!, [key]: value },
    });
  };

  const onPaymentMethodChange = (paymentMethod: PaymentMethod): void => {
    setOrderForm({ ...orderForm!, paymentMethod });
  };

  const onDeleteAllButtonClick = (): void => {
    dispatch(clearCart(authentication?.id!));
  };

  const onDeleteSingleButtonClick = (cartItem: any): void => {
    dispatch(removeItem(cartItem));
  };

  const isPreviousButtonDisabled = (): boolean => {
    return currentStep === CheckoutStep.DELIVERY_DETAILS;
  };

  const isNextButtonHidden = (): boolean => {
    return currentStep === CheckoutStep.CART_SUMMARY;
  };

  const isConfirmButtonHidden = (): boolean => {
    return currentStep !== CheckoutStep.CART_SUMMARY;
  };

  const isNextButtonDisabled = (): boolean => {
    if (isFormInvalid) {
      return true;
    }

    switch (currentStep) {
      case CheckoutStep.DELIVERY_DETAILS:
        return (
          isNullOrUndefined(orderForm?.buyer) ||
          isEmpty(orderForm?.buyer) ||
          isNullOrUndefined(orderForm?.phoneNumber) ||
          isEmpty(orderForm?.phoneNumber) ||
          isNullOrUndefined(orderForm?.deliveryType) ||
          isEmpty(orderForm?.deliveryType) ||
          (orderForm?.deliveryType !== DeliveryType.STORE &&
            (isNullOrUndefined(orderForm?.deliveryAddress?.city) ||
              isEmpty(orderForm?.deliveryAddress?.city) ||
              isNullOrUndefined(orderForm?.deliveryAddress?.address) ||
              isEmpty(orderForm?.deliveryAddress?.address) ||
              isNullOrUndefined(orderForm?.deliveryAddress?.zipCode) ||
              isEmpty(orderForm?.deliveryAddress?.zipCode)))
        );

      case CheckoutStep.PAYMENT_METHOD:
        return isNullOrUndefined(orderForm?.paymentMethod);

      default:
        return true;
    }
  };

  const onNextButtonClick = (): void => {
    setCurrentStep(determineNextStep(currentStep));
  };

  const onPreviousButtonClick = (): void => {
    setCurrentStep(determinePreviousStep(currentStep));
  };

  console.log("currentStep: ", currentStep);

  return (
    <div className="h-full">
      <Header animated showMenu backgroundColor="split" />
      <div className="grid grid-cols-2 text-white">
        <div
          className={`${styles.h_full} bg_primary pt-2 pb-2 pl-8 pr-8 overflow-y-auto`}
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div className="text-3xl font-thin mt-2">Shopping cart</div>
              <Icon icon="las la-shopping-cart" className="ml-3 text-4xl" />
            </div>
            <div
              className={declassify(
                "flex items-center normal-case bg_white text-black hover:bg-red-400 hover:text-white rounded-lg pl-4 pr-4 cursor-pointer",
                { invisible: isEmpty(cart) }
              )}
            >
              <div className="mr-4" onClick={onDeleteAllButtonClick}>
                Clear all
              </div>
              <Icon icon="las la-dumpster" className="text-2xl" />
            </div>
          </div>
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={useFadeInOutVariants({ duration: 0.5 })}
          >
            {isEmpty(cart) && (
              <div className="absolute w-screen pr-14">
                <Alert
                  type={AlertType.INFO}
                  accentBorderPosition="left"
                  text={alert.NO_ITEMS_IN_CART_YET}
                />
              </div>
            )}
            {cart?.items.map((cartItem, index) => (
              <CartItem
                key={index}
                cartItem={cartItem}
                onDeleteSingleButtonClick={onDeleteSingleButtonClick}
              />
            ))}
          </motion.div>
        </div>
        <div className={`${styles.h_full} bg_brown text-white relative`}>
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={useFadeInOutTopVariants({ duration: 0.5, delay: 0.5 })}
          >
            <CheckoutStepper className="pt-8" currentStep={currentStep!} />
          </motion.div>
          <motion.div
            key={currentStep}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={useFadeInOutRightVariants({ duration: 0.5, delay: 0.5 })}
            className="px-12 py-8"
          >
            {currentStep === CheckoutStep.DELIVERY_DETAILS && (
              <DeliveryDetails
                orderForm={orderForm}
                onFullnameChange={onFullnameChange}
                onPhoneNumberChange={onPhoneNumberChange}
                onDeliveryTypeChange={onDeliveryTypeChange}
                onDeliveryAddressChange={onDeliveryAddressChange}
                setIsFormInvalid={setIsFormInvalid}
              />
            )}
            {currentStep === CheckoutStep.PAYMENT_METHOD && (
              <ChoosePaymentMethod
                orderForm={orderForm}
                onPaymentMethodChange={onPaymentMethodChange}
              />
            )}
          </motion.div>

          {/* {!isEmpty(cart) && (
            <div className="absolute w-full pl-12 pr-12 bottom-10">
              <hr className="border-1 text-white bg-gray-600 mb-3" />
              <div className="flex justify-between">
                <div className="text-md font-medium">Subtotal</div>
                <div className="text-xl font-semibold">
                  {formatNumberToCurrency(calculateSubtotal())}
                </div>
              </div>
              <div className="flex justify-between mt-1 pb-2">
                <div className="text-md font-medium">Shipping</div>
                <div className="text-xl font-semibold">
                  + {formatNumberToCurrency(SHIPPING_COST)}
                </div>
              </div>
              <hr className="border-1 text-white bg-gray-600" />
              <div className="flex justify-between mt-2 pt-2">
                <div className="text-md font-semibold">Total</div>
                <div className="flex items-end">
                  <div className="text-sm mb-1 mr-2">USD</div>
                  <div className="text-2xl font-semibold">
                    {formatNumberToCurrency(calculateTotal())}
                  </div>
                </div>
              </div>
              <hr className="border-1 text-white bg-gray-600 mt-3" />
              <div className="w-full h-10 bg-blue-500 hover:bg-blue-600 rounded-md flex items-center justify-center cursor-pointer mt-6 text-md">
                Procced to checkout
              </div>
            </div>
          )} */}
        </div>
        <div className="flex absolute bottom-0 left-1/2 w-full h-16 text-black text-lg ">
          <div
            className={declassify(
              "flex items-center justify-center w-1/4",
              {
                "cursor-not-allowed bg_gray": isPreviousButtonDisabled(),
              },
              {
                "cursor-pointer bg_white hover:bg-gray-200":
                  !isPreviousButtonDisabled(),
              }
            )}
            onClick={() => {
              if (!isPreviousButtonDisabled()) {
                onPreviousButtonClick();
              }
            }}
          >
            <div className="flex items-center">
              <Icon icon="las la-arrow-left mr-3" />
              <div className="uppercase">Previous</div>
            </div>
          </div>
          {!isNextButtonHidden() ? (
            <div
              className={declassify(
                "flex items-center justify-center w-1/4",
                {
                  "bg_white cursor-pointer hover:bg-gray-200":
                    !isNextButtonDisabled(),
                },
                { "bg_gray cursor-not-allowed": isNextButtonDisabled() }
              )}
              {...(!isNextButtonDisabled() && {
                onClick: onNextButtonClick,
              })}
            >
              <div
                className={declassify(
                  "flex items-center",
                  { visible: !isNextButtonHidden() },
                  { invisible: isNextButtonHidden() }
                )}
              >
                <div className="uppercase">Next</div>
                <Icon icon="las la-arrow-right ml-3" />
              </div>
            </div>
          ) : (
            <div
              className={declassify(
                "flex items-center justify-center w-1/4",
                {
                  "bg_white cursor-pointer": !isNextButtonDisabled(),
                },
                {
                  "bg_gray cursor-not-allowed": isNextButtonDisabled(),
                }
              )}
              onClick={() => {
                if (!isNextButtonDisabled()) {
                  onNextButtonClick();
                }
              }}
            >
              <div
                className={declassify(
                  "flex items-center",
                  { visible: !isConfirmButtonHidden() },
                  { invisible: isConfirmButtonHidden() }
                )}
              >
                {true ? (
                  <div className="flex items-center">
                    <div className="uppercase">Confirm</div>
                    <Icon icon="las la-check ml-3" />
                  </div>
                ) : (
                  <Loader />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authentication, cart }: RootState) => ({
  authentication,
  cart,
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default authenticatedBoundaryRoute(connect(mapStateToProps)(Cart));
