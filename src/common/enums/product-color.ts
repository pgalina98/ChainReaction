export enum ProductColor {
  WHITE = 1,
  DARK_GRAY = 2,
  BLACK = 3,
}

export const getProductColorValue = (idProductColor: number): string | null => {
  switch (idProductColor) {
    case 1:
      return "WHITE";

    case 2:
      return "GRAY-DARK";

    case 3:
      return "BLACK";

    default:
      return null;
  }
};
