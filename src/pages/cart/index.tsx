import React, { useEffect, useState } from "react";

import { connect, useDispatch } from "react-redux";

import Stripe, { Token } from "react-stripe-checkout";

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
import { ToastType } from "@enums/toast-type";

import OrderForm, {
  createEmptyOrderFormObject,
} from "@models/order/order.model";

import { RootState } from "@store/index";

import { messages } from "@constants/messages";

import {
  declassify,
  isEmpty,
  isNullOrUndefined,
  toString,
} from "@utils/common";
import {
  calculateDiscount,
  calculateSubtotal,
  calculateTotalWithDiscount,
  calculateTotalWithoutDiscount,
} from "@utils/cart";
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
  Button,
  Card,
  CartItem,
  CheckoutStepper,
  CreditCard,
  Header,
  Icon,
  Input,
  Loader,
  Radio,
  Toast,
} from "@components";
import authenticatedBoundaryRoute from "@components/hoc/route-guards/authenticatedBoundaryRoute";
import { useToast } from "@components/hooks/useToast";

import { clearCart, removeItem } from "@features/cart/cart-slice";
import { FAST_SHIPPING_COST, SHIPPING_COST } from "@features/cart/constants";
import {
  useValidateAddress,
  useValidateCity,
  useValidateFullname,
  useValidatePhoneNumber,
  useValidateZipCode,
} from "@features/registration/validators";
import useValidateDiscountCode from "@features/discount-code/api/hooks/useValidateDiscountCode";
import { handleStripeToken } from "@features/payment/api/queries";

import styles from "./cart.module.scss";
import useDidMountEffect from "common/hooks/useDidMountEffect";

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
            helper={`Deliver via DHL (${formatNumberToCurrency(
              SHIPPING_COST
            )})`}
            helperText={`Estimated delivery: ${calculateStandardDeliveryArrivalDateRange()}`}
            isChecked={orderForm?.deliveryType === DeliveryType.DHL_DELIVERY}
            onChange={() => {
              onDeliveryTypeChange(DeliveryType.DHL_DELIVERY);
            }}
          />
          <Radio
            className="mt-2"
            helper={`Deliver via FedEx (${formatNumberToCurrency(
              FAST_SHIPPING_COST
            )})`}
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

const ChoosePaymentMethod = ({
  orderForm,
  onPaymentMethodChange,
  onCreditCardDetailsChange,
  setIsFormInvalid,
}) => {
  const [flipCard, setFlipCard] = useState<boolean>(null!);

  useEffect(() => {
    setFlipCard(null!);
  }, [orderForm?.paymentMethod]);

  useEffect(() => {
    if (!isNullOrUndefined(orderForm?.creditCardDetails?.cvv)) {
      setFlipCard(true);
    }
  }, [orderForm?.creditCardDetails?.cvv]);

  useDidMountEffect(() => {
    if (
      !isNullOrUndefined(orderForm?.creditCardDetails?.cardNumber) ||
      !isNullOrUndefined(orderForm?.creditCardDetails?.expirationDate) ||
      !isNullOrUndefined(orderForm?.creditCardDetails?.cardholder)
    ) {
      if (!isNullOrUndefined(flipCard)) {
        setFlipCard(false);
      }
    }
  }, [
    orderForm?.creditCardDetails?.cardNumber,
    orderForm?.creditCardDetails?.expirationDate,
    orderForm?.creditCardDetails?.cardholder,
  ]);

  return (
    <div>
      <div className="text-xl font-thin">Choose payment method</div>
      <div className="flex justify-between">
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
            helper="PayPal (available soon)"
            helperText="Pay with PayPal without additional fee."
            isChecked={orderForm?.paymentMethod === PaymentMethod.PAY_PAL}
            isDisabled
            onChange={() => {
              onPaymentMethodChange(PaymentMethod.PAY_PAL);
            }}
          />
          <Radio
            className="mt-4"
            helper="Apple pay (available soon)"
            helperText="Pay with Apple pay without additional fee."
            isChecked={orderForm?.paymentMethod === PaymentMethod.APPLE_PAY}
            isDisabled
            onChange={() => {
              onPaymentMethodChange(PaymentMethod.APPLE_PAY);
            }}
          />
        </div>
        <motion.div
          key={toString(orderForm?.paymentMethod)}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={useFadeInOutVariants({ duration: 0.4 })}
          className={declassify("-mt-8", {
            hidden: orderForm?.paymentMethod !== PaymentMethod.CREDIT_CART,
          })}
        >
          <CreditCard
            cardNumber={orderForm?.creditCardDetails?.cardNumber!}
            expirationDate={orderForm?.creditCardDetails?.expirationDate!}
            cardholder={orderForm?.creditCardDetails?.cardholder!}
            cvv={orderForm?.creditCardDetails?.cvv!}
            flipCard={flipCard}
            setFlipCard={setFlipCard}
          />
        </motion.div>
      </div>
      <motion.div
        key={toString(orderForm?.paymentMethod)}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={useFadeInOutVariants({ duration: 0.4 })}
        className={declassify("mt-8", {
          hidden: orderForm?.paymentMethod !== PaymentMethod.CREDIT_CART,
        })}
      >
        <div className="flex justify-center space-x-24">
          <Input
            id="cardholder"
            className="w-5/12"
            label="Cardholder fullname"
            labelColor="text-white"
            placeholder="Enter cardholder fullname"
            prependIcon="las la-id-card"
            value={orderForm?.creditCardDetails?.cardholder}
            onChange={(value) => onCreditCardDetailsChange("cardholder", value)}
            validate
            validator={useValidateFullname}
            onValidationStateChange={(isInvalid: boolean) => {
              setIsFormInvalid(isInvalid);
            }}
          />
          <Input
            id="expirationDate"
            className="w-4/12"
            label="Expiration date"
            labelColor="text-white"
            placeholder="Enter exp. date"
            maxLength={5}
            prependIcon="las la-calendar"
            value={orderForm?.creditCardDetails?.expirationDate}
            onChange={(value) => {
              if (+value.substring(0, 2) >= 0 && +value.substring(0, 2) < 13) {
                onCreditCardDetailsChange(
                  "expirationDate",
                  value.replace("/", "").replace(/^(.{2})(.*)$/, "$1/$2")
                );
              }
            }}
          />
        </div>
        <div className="flex justify-center space-x-24 mt-8">
          <Input
            id="cardNumber"
            className="w-5/12"
            label="Card number"
            labelColor="text-white"
            placeholder="Enter card number"
            maxLength={19}
            prependIcon="las la-credit-card"
            value={orderForm?.creditCardDetails?.cardNumber}
            onChange={(value) => {
              if (value.match(/^(?=.*\d)[\d ]+$/g)) {
                onCreditCardDetailsChange(
                  "cardNumber",
                  value.replace(/\s+/g, "").replace(/\d{4}(?=.)/g, "$& ")
                );
              }
            }}
          />
          <Input
            id="CVV"
            className="w-4/12"
            label="CVV"
            labelColor="text-white"
            placeholder="Enter CVV"
            maxLength={3}
            prependIcon="las la-barcode"
            value={orderForm?.creditCardDetails?.cvv}
            onChange={(value) => onCreditCardDetailsChange("cvv", value)}
          />
        </div>
      </motion.div>
    </div>
  );
};

const DiscountCode = ({
  orderForm,
  onUseDiscountCodeChange,
  isValidating,
  onValidateCodeButtonClick,
}) => {
  const [discountCode, setDiscountCode] = useState<string>();

  const isValidateButtonDisabled = (): boolean => {
    return (
      isNullOrUndefined(orderForm?.discountCode) ||
      isEmpty(orderForm?.discountCode) ||
      isValidating
    );
  };

  return (
    <div>
      <div className="text-xl font-thin">Enter discount code</div>
      <div className="mt-4">
        <Radio
          helper="With discount code"
          helperText="Check this option if you have valid discount code."
          isChecked={orderForm?.useDiscountCode}
          onChange={() => {
            onUseDiscountCodeChange(true);
          }}
        />
        <Radio
          className="mt-4"
          helper="Without discount code"
          helperText="Check this option if you don't have discount code."
          isChecked={!orderForm?.useDiscountCode}
          onChange={() => {
            onUseDiscountCodeChange(false);
          }}
        />
      </div>
      <div className="mt-8">
        <motion.div
          key={toString(orderForm?.useDiscountCode)}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={useFadeInOutVariants({ duration: 0.4 })}
          className={declassify("flex items-center", {
            hidden: !orderForm?.useDiscountCode,
          })}
        >
          <Input
            id="discountCode"
            className="w-1/2"
            label="Discount code"
            labelColor="text-white"
            placeholder="Enter discount code"
            prependIcon="las la-tag"
            value={discountCode}
            onChange={setDiscountCode}
          />
          <Button
            label="Validate code"
            className="pt-1 pb-1 ml-12 mt-6"
            appendIcon="las la-sync ml-2"
            iconSize="text-2xl"
            loaderWithLabel={false}
            isDisabled={!isValidateButtonDisabled}
            isLoading={isValidating}
            onClick={() => onValidateCodeButtonClick(discountCode)}
          />
        </motion.div>
        <motion.div
          key={orderForm?.discountCode?.discount}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={useFadeInOutVariants({ duration: 0.1 })}
          className={declassify(
            "flex items-center text-xs font-normal text-gray-400",
            {
              hidden:
                !orderForm?.useDiscountCode ||
                !orderForm?.discountCode?.discount,
            }
          )}
        >
          Discount of {orderForm?.discountCode?.discount}% will be applied on
          checkout.
        </motion.div>
      </div>
    </div>
  );
};

const OrderSummary = ({ orderForm, getDeliveryCost }) => {
  const calculateDeliveryCost = (): string => {
    switch (orderForm?.deliveryType) {
      case DeliveryType.STORE:
        return "FREE";

      case DeliveryType.DHL_DELIVERY:
        return formatNumberToCurrency(SHIPPING_COST);

      case DeliveryType.FED_EX_DELIVERY:
        return formatNumberToCurrency(FAST_SHIPPING_COST);

      default:
        return formatNumberToCurrency(SHIPPING_COST);
    }
  };

  return (
    <div>
      <div className="text-xl font-thin">Order summary</div>
      <div className="mt-4">
        <hr className="border-1 text-white bg-gray-600" />
        <div className="flex justify-between mt-3 pb-2">
          <div className="text-md font-medium">Subtotal</div>
          <div className="text-xl font-semibold">
            {formatNumberToCurrency(calculateSubtotal())}
          </div>
        </div>
        <div className="flex justify-between mt-1 pb-2">
          <div className="text-md font-medium">Shipping</div>
          <div className="text-xl font-semibold">
            + {calculateDeliveryCost()}
          </div>
        </div>
        <div className="flex justify-between mt-1 pb-2">
          <div className="text-md font-medium">Sales tax (0%)</div>
          <div className="text-xl font-semibold">
            + {formatNumberToCurrency(0)}
          </div>
        </div>
        <div className="flex flex-col pb-2">
          <div className="flex justify-between mt-1">
            <div className="text-md font-medium">Discount</div>
            <div className="text-xl font-semibold">
              -{" "}
              {formatNumberToCurrency(
                calculateDiscount(orderForm?.discountCode?.discount)
              )}
            </div>
          </div>
          <div
            className={declassify("-mt-2 text-sm font-normal text-gray-400", {
              hidden: !orderForm?.discountCode.code,
            })}
          >
            {orderForm?.discountCode?.discount}% off
          </div>
        </div>
        <hr className="border-1 text-white bg-gray-600" />
        <div className="flex justify-between mt-2 pt-2">
          <div className="text-lg font-semibold">Total</div>
          <div className="flex items-end">
            <div className="text-sm mb-1 mr-2">USD</div>
            <div className="text-2xl font-semibold">
              {orderForm?.discountCode?.code
                ? formatNumberToCurrency(
                    calculateTotalWithDiscount(
                      getDeliveryCost(),
                      orderForm?.discountCode?.discount
                    )
                  )
                : formatNumberToCurrency(
                    calculateTotalWithoutDiscount(getDeliveryCost())
                  )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface CartProps extends StateProps {}

const Cart = ({ authentication, cart }: CartProps) => {
  const dispatch = useDispatch();
  const [isShown, setIsShown] = useToast({ duration: 4000 });

  const [orderForm, setOrderForm] = useState<OrderForm>();
  const [isFormInvalid, setIsFormInvalid] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<CheckoutStep>(
    CheckoutStep.ORDER_SUMMARY
  );

  const {
    isLoading: isValidating,
    isError: isValidationError,
    isSuccess: isValidationSuccess,
    error: validationError,
    mutate: validate,
  } = useValidateDiscountCode();

  useEffect(() => {
    setOrderForm({
      ...createEmptyOrderFormObject(),
      idUser: authentication.id!,
    });
  }, []);

  useEffect(() => {
    setIsShown(isValidationError);
  }, [isValidationError]);

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

  const onCreditCardDetailsChange = (key: string, value: string): void => {
    setOrderForm({
      ...orderForm!,
      creditCardDetails: { ...orderForm?.creditCardDetails!, [key]: value },
    });
  };

  const onUseDiscountCodeChange = (useDiscountCode: boolean): void => {
    setOrderForm({ ...orderForm!, useDiscountCode });
  };

  const onDeleteAllButtonClick = (): void => {
    dispatch(clearCart(authentication?.id!));
  };

  const onDeleteSingleButtonClick = (cartItem: any): void => {
    dispatch(removeItem(cartItem));
  };

  const onValidateCodeButtonClick = (code: string): void => {
    validate(code, {
      onSuccess: ({ data }) =>
        setOrderForm({ ...orderForm!, discountCode: data }),
    });
  };

  const isPreviousButtonDisabled = (): boolean => {
    return currentStep === CheckoutStep.DELIVERY_DETAILS;
  };

  const isNextButtonHidden = (): boolean => {
    return currentStep === CheckoutStep.ORDER_SUMMARY;
  };

  const isConfirmButtonHidden = (): boolean => {
    return (
      currentStep !== CheckoutStep.ORDER_SUMMARY ||
      orderForm?.paymentMethod === PaymentMethod.CREDIT_CART
    );
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
        return (
          isNullOrUndefined(orderForm?.paymentMethod) ||
          (orderForm?.paymentMethod === PaymentMethod.CREDIT_CART &&
            (isNullOrUndefined(orderForm?.creditCardDetails?.cardNumber) ||
              isEmpty(orderForm?.creditCardDetails?.cardNumber) ||
              isNullOrUndefined(orderForm?.creditCardDetails?.expirationDate) ||
              isEmpty(orderForm?.creditCardDetails?.expirationDate) ||
              isNullOrUndefined(orderForm?.creditCardDetails?.cardholder) ||
              isEmpty(orderForm?.creditCardDetails?.cardholder) ||
              isNullOrUndefined(orderForm?.creditCardDetails?.cvv) ||
              isEmpty(orderForm?.creditCardDetails?.cvv) ||
              orderForm?.creditCardDetails?.cardNumber.length < 19 ||
              orderForm?.creditCardDetails?.cvv.length < 3)) ||
          isFormInvalid
        );

      case CheckoutStep.DISCOUNT_CODE: {
        if (!orderForm?.useDiscountCode) {
          return false;
        }

        return (
          isNullOrUndefined(orderForm?.discountCode) ||
          isEmpty(orderForm?.discountCode)
        );
      }

      default:
        return true;
    }
  };

  const getDeliveryCost = (): number => {
    switch (orderForm?.deliveryType) {
      case DeliveryType.STORE:
        return 0;

      case DeliveryType.DHL_DELIVERY:
        return SHIPPING_COST;

      case DeliveryType.FED_EX_DELIVERY:
        return FAST_SHIPPING_COST;

      default:
        return SHIPPING_COST;
    }
  };

  const onNextButtonClick = (): void => {
    setCurrentStep(determineNextStep(currentStep));
  };

  const onPreviousButtonClick = (): void => {
    setCurrentStep(determinePreviousStep(currentStep));
  };

  const hasAnyError = (): boolean => {
    return isValidationError;
  };

  const onConfirmButtonClick = (): void => {};

  const onPaymentSuccess = (): void => {};

  const onPaymentError = (): void => {};

  return (
    <div className="h-full">
      <Header animated showMenu backgroundColor="split" />
      {hasAnyError() && (
        <Toast
          type={ToastType.DANGER}
          message={
            validationError?.response.data?.message ||
            messages.INTERNAL_SERVER_ERROR
          }
          isShown={isShown}
          hideToast={() => setIsShown(false)}
        />
      )}
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
              <div className="absolute w-screen pr-14 z-10">
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
            className={declassify({ hidden: isEmpty(cart) })}
          >
            <CheckoutStepper className="pt-8" currentStep={currentStep!} />
          </motion.div>
          <motion.div
            key={currentStep}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={useFadeInOutRightVariants({ duration: 0.5, delay: 0.5 })}
            className={declassify("px-6 py-8", { hidden: isEmpty(cart) })}
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
                onCreditCardDetailsChange={onCreditCardDetailsChange}
                setIsFormInvalid={setIsFormInvalid}
              />
            )}
            {currentStep === CheckoutStep.DISCOUNT_CODE && (
              <DiscountCode
                orderForm={orderForm}
                onUseDiscountCodeChange={onUseDiscountCodeChange}
                isValidating={isValidating}
                onValidateCodeButtonClick={onValidateCodeButtonClick}
              />
            )}
            {currentStep === CheckoutStep.ORDER_SUMMARY && (
              <OrderSummary
                orderForm={orderForm}
                getDeliveryCost={getDeliveryCost}
              />
            )}
          </motion.div>
          <div
            className={declassify("absolute bottom-4 right-32 z-10", {
              hidden:
                currentStep !== CheckoutStep.ORDER_SUMMARY ||
                orderForm?.paymentMethod !== PaymentMethod.CREDIT_CART,
            })}
          >
            <Stripe
              stripeKey={process.env.NEXT_PUBLIC_STRIPE_API_KEY!}
              description="Confirm payment"
              amount={
                orderForm?.discountCode?.code
                  ? calculateTotalWithDiscount(
                      getDeliveryCost(),
                      orderForm?.discountCode?.discount
                    ) * 100
                  : calculateTotalWithoutDiscount(getDeliveryCost()) * 100
              }
              token={(token: Token) => {
                if (orderForm?.discountCode?.code) {
                  handleStripeToken(
                    token,
                    calculateTotalWithDiscount(
                      getDeliveryCost(),
                      orderForm?.discountCode?.discount
                    ),
                    onPaymentSuccess,
                    onPaymentError
                  );
                } else {
                  handleStripeToken(
                    token,
                    calculateTotalWithoutDiscount(getDeliveryCost()),
                    onPaymentSuccess,
                    onPaymentError
                  );
                }
              }}
            />
          </div>
        </div>
        <div
          className={declassify(
            "flex absolute bottom-0 left-1/2 w-full h-16 text-black text-lg",
            { hidden: isEmpty(cart) }
          )}
        >
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
                "flex items-center justify-center w-1/4 bg_white",
                {
                  "cursor-pointer hover:bg-gray-200":
                    orderForm?.paymentMethod === PaymentMethod.CASH,
                }
              )}
              onClick={() => {
                if (!isConfirmButtonHidden()) {
                  onConfirmButtonClick();
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
