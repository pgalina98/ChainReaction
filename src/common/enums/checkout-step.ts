export enum CheckoutStep {
  DELIVERY_DETAILS = 1,
  PAYMENT_METHOD = 2,
  DISCOUNT_CODE = 3,
  ORDER_SUMMARY = 4,
}

export const CheckoutSteps = [
  CheckoutStep.DELIVERY_DETAILS,
  CheckoutStep.PAYMENT_METHOD,
  CheckoutStep.DISCOUNT_CODE,
  CheckoutStep.ORDER_SUMMARY,
];

export const determineNextStep = (currentStep: CheckoutStep): CheckoutStep => {
  switch (currentStep) {
    case CheckoutStep.DELIVERY_DETAILS:
      return CheckoutStep.PAYMENT_METHOD;

    case CheckoutStep.PAYMENT_METHOD:
      return CheckoutStep.DISCOUNT_CODE;

    case CheckoutStep.DISCOUNT_CODE:
      return CheckoutStep.ORDER_SUMMARY;

    default:
      return CheckoutStep.DELIVERY_DETAILS;
  }
};

export const determinePreviousStep = (
  currentStep: CheckoutStep
): CheckoutStep => {
  switch (currentStep) {
    case CheckoutStep.ORDER_SUMMARY:
      return CheckoutStep.DISCOUNT_CODE;

    case CheckoutStep.DISCOUNT_CODE:
      return CheckoutStep.PAYMENT_METHOD;

    case CheckoutStep.PAYMENT_METHOD:
      return CheckoutStep.DELIVERY_DETAILS;

    default:
      return CheckoutStep.DELIVERY_DETAILS;
  }
};
