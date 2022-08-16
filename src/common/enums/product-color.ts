export enum ProductColor {
  WHITE = 1,
  GRAY_DARK = 2,
  BLACK = 3,
  BLUE = 4,
  ORANGE = 5,
  PINK = 6,
  YELLOW = 7,
}

export const getProductColorValue = (idProductColor: number): string | null => {
  switch (idProductColor) {
    case ProductColor.WHITE:
      return "WHITE";

    case ProductColor.GRAY_DARK:
      return "GRAY-DARK";

    case ProductColor.BLACK:
      return "BLACK";

    case ProductColor.BLUE:
      return "BLUE";

    case ProductColor.ORANGE:
      return "ORANGE";

    case ProductColor.PINK:
      return "PINK";

    case ProductColor.YELLOW:
      return "YELLOW";

    default:
      return null;
  }
};

export const getProductColorId = (productColor: string): number | null => {
  switch (productColor) {
    case "WHITE":
      return ProductColor.WHITE;

    case "GRAY-DARK":
      return ProductColor.GRAY_DARK;

    case "BLACK":
      return ProductColor.BLACK;

    case "BLUE":
      return ProductColor.BLUE;

    case "ORANGE":
      return ProductColor.ORANGE;

    case "PINK":
      return ProductColor.PINK;

    case "YELLOW":
      return ProductColor.YELLOW;

    default:
      return null;
  }
};
