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
