import { Dayjs } from "dayjs";

export interface DiscountCode {
  code: string;
  discount: number;
  activeFrom: Dayjs;
  activeTo: Dayjs;
}

export const createEmptyDiscountCodeObject = (): DiscountCode => {
  return {
    code: null as any,
    discount: null as any,
    activeFrom: null as any,
    activeTo: null as any,
  };
};
