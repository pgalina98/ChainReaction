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
    case 1:
      return "WHITE";

    case 2:
      return "GRAY-DARK";

    case 3:
      return "BLACK";

    case 4:
      return "BLUE";

    case 5:
      return "ORANGE";

    case 6:
      return "PINK";

    case 7:
      return "YELLOW";

    default:
      return null;
  }
};
