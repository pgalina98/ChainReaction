export enum ProductSize {
  S = 1,
  M = 2,
  L = 3,
  XL = 4,
}

export const getProductsIZEValue = (idProductSize: number): string | null => {
  switch (idProductSize) {
    case 1:
      return "SMALL";

    case 2:
      return "NEDIUM";

    case 3:
      return "LARGE";

    case 4:
      return "EXTRA-LARGE";

    default:
      return null;
  }
};
