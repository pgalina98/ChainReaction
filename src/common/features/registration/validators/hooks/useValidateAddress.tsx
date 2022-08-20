import { ValidationResult } from "common/types/validation-result.type";

import { messages } from "@constants/messages";
import { isEmpty } from "@utils/common";

const REGEX_ADDRESS_PATTERN: RegExp = /^[A-Za-z\s0-9]*$/;

const useValidateAddress = (address: string): ValidationResult => {
  if (isEmpty(address)) {
    return { isValid: false, error: messages.ADDRESS_IS_REQUIRED };
  }

  const regex = new RegExp(REGEX_ADDRESS_PATTERN);

  const isValid = regex.test(address);

  if (isValid) {
    return { isValid };
  } else {
    return { isValid, error: messages.ADDRESS_IS_INVALID };
  }
};

export default useValidateAddress;
