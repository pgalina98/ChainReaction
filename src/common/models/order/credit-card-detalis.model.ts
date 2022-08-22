export default interface CreditCardDetails {
  cardNumber: string;
  expirationDate: string;
  cardholder: string;
  cvv: string;
}

export const createEmptyCreditCardDetailsObject = (): CreditCardDetails => {
  return {
    cardNumber: null as any,
    expirationDate: null as any,
    cardholder: null as any,
    cvv: null as any,
  };
};
