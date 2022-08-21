import { useMutation } from "react-query";

import { validateDiscountCode } from "../queries";

import { VALIDATE_DISCOUNT_CODE } from "../queries/constants";

const useValidateDiscountCode = (): any => {
  return useMutation(VALIDATE_DISCOUNT_CODE, (discountCode: string): any => {
    return validateDiscountCode(discountCode)();
  });
};

export default useValidateDiscountCode;
