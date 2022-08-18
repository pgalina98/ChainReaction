export const formatNumberToCurrency = (
  number: number,
  withCurrencySymbol: boolean = true
): string => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  if (!withCurrencySymbol) {
    return formatter.format(number).replace("$", "");
  }

  return formatter.format(number);
};
