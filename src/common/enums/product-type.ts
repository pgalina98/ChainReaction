export enum ProductType {
  E_BIKE = 1,
  BIKE = 2,
  HELMET = 3,
}

export const getProductTypeValue = (idProductType: number): string | null => {
  switch (idProductType) {
    case ProductType.E_BIKE:
      return "E-BIKE";

    case ProductType.BIKE:
      return "BIKE";

    case ProductType.HELMET:
      return "HELMET";

    default:
      return null;
  }
};
