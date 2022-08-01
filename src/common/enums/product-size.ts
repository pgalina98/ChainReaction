export enum ProductSize {
  S = 1,
  M = 2,
  L = 3,
  XL = 4,
}

export const getProductSizeValue = (idProductSize: number): string | null => {
  switch (idProductSize) {
    case ProductSize.S:
      return "SMALL";

    case ProductSize.M:
      return "NEDIUM";

    case ProductSize.L:
      return "LARGE";

    case ProductSize.XL:
      return "EXTRA-LARGE";

    default:
      return null;
  }
};
