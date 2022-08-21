import axios from "@utils/api";

export const validateDiscountCode = (discountCode: string) => {
  return async () =>
    await axios.post<void>(`/discount-codes/${discountCode}/validate`);
};
