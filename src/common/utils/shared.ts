import Product from "@models/product/product.model";

export function getMirroredImagePath(imagePath: string): string {
  const imagePathWithoutExtension = imagePath.substring(
    0,
    imagePath.lastIndexOf(".")
  );
  const imageExtension = imagePath.substring(
    imagePath.lastIndexOf("."),
    imagePath.length
  );

  return `${imagePathWithoutExtension}_mirrored${imageExtension}`;
}

export const isProductAvailable = (product: Product): boolean => {
  return product?.availableQuantity! > 0;
};

export const calcluateProgressBarValue = (
  value: number,
  comparativeValue: number
): number => {
  return Math.round((value / comparativeValue) * 100);
};
