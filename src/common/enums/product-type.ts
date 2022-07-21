export enum ProductType {
  E_BIKE = 1,
  BIKE = 2,
  BLACK = 3,
}

export const getProductTypeValue = (idProductType: number): string | null => {
  switch (idProductType) {
    case 1:
      return "E-BIKE";

    case 2:
      return "BIKE";

    case 3:
      return "ACCESSORIES";

    default:
      return null;
  }
};
