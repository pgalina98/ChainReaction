import { default as DeliveryTypeModel } from "@models/order/delivery-type.model";

export enum DeliveryType {
  STORE = 1,
  DHL_DELIVERY = 2,
  FED_EX_DELIVERY = 3,
}

export const getDeliveryType = (
  deliveryType: DeliveryType
): DeliveryTypeModel | null => {
  switch (deliveryType) {
    case DeliveryType.STORE:
      return {
        idDeliveryType: 1,
        value: "STORE",
        minimumArrivalDays: 6,
        maximumArrivalDays: 15,
      };

    case DeliveryType.DHL_DELIVERY:
      return {
        idDeliveryType: 2,
        value: "DHL DELIVERY",
        minimumArrivalDays: 20,
        maximumArrivalDays: 26,
      };

    case DeliveryType.FED_EX_DELIVERY:
      return {
        idDeliveryType: 3,
        value: "FEDEX DELIVERY",
        minimumArrivalDays: 7,
        maximumArrivalDays: 11,
      };

    default:
      return null;
  }
};

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
