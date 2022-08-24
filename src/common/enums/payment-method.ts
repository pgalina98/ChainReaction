export enum PaymentMethod {
  CASH = 1,
  CREDIT_CART = 2,
  PAY_PAL = 3,
  APPLE_PAY = 4,
}

export const getPaymentMethodValue = (idPaymentType: number): string | null => {
  switch (idPaymentType) {
    case PaymentMethod.CASH:
      return "CASH";

    case PaymentMethod.CREDIT_CART:
      return "CREDIT CART";

    case PaymentMethod.PAY_PAL:
      return "PAY PAL";

    case PaymentMethod.APPLE_PAY:
      return "APPLE PAL";

    default:
      return null;
  }
};
