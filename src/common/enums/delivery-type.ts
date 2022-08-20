export enum DeliveryType {
  STORE = 1,
  DHL_DELIVERY = 2,
  FED_EX_DELIVERY = 3,
}

export const getDeliveryTypeValue = (idDeliveryType: number): string | null => {
  switch (idDeliveryType) {
    case DeliveryType.STORE:
      return "STORE";

    case DeliveryType.DHL_DELIVERY:
      return "DHL DELIVERY";

    case DeliveryType.FED_EX_DELIVERY:
      return "FED EX DELIVERY";

    default:
      return null;
  }
};
