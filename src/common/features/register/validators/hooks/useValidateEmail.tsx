import { ValidationResult } from "common/types/validation-result.type";

import { messages } from "@constants/messages";
import { isEmpty } from "@utils/common";

const REGEX_EMAIL_PATTERN: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const useValidateEmail = (email: string): ValidationResult => {
  if (isEmpty(email)) {
    return { isValid: false, error: messages.EMAIL_IS_REQUIRED };
  }

  const regex = new RegExp(REGEX_EMAIL_PATTERN);

  const isValid = regex.test(email);

  if (isValid) {
    return { isValid };
  } else {
    return { isValid, error: messages.EMAIL_IS_INVALID };
  }
};

export default useValidateEmail;
