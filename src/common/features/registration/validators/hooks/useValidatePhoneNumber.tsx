import { ValidationResult } from "common/types/validation-result.type";

import { messages } from "@constants/messages";
import { isEmpty } from "@utils/common";

const REGEX_PHONE_NUMBER_PATTERN: RegExp =
  /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

const useValidatePhoneNumber = (phoneNumber: string): ValidationResult => {
  if (isEmpty(phoneNumber)) {
    return { isValid: false, error: messages.PHONE_NUMBER_IS_REQUIRED };
  }

  const regex = new RegExp(REGEX_PHONE_NUMBER_PATTERN);

  const isValid = regex.test(phoneNumber);

  if (isValid) {
    return { isValid };
  } else {
    return { isValid, error: messages.INVALID_FORMAT };
  }
};

export default useValidatePhoneNumber;
