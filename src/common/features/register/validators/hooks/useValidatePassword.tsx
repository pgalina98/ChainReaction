import { ValidationResult } from "common/types/validation-result.type";

import { messages } from "@constants/messages";
import { isEmpty } from "@utils/common";

const REGEX_PASSWORD_PATTERN: RegExp = /^\S+$/;

const useValidatePassword = (password: string): ValidationResult => {
  if (isEmpty(password)) {
    return { isValid: false, error: messages.PASSWORD_IS_REQUIRED };
  }

  if (password.length < 8) {
    return { isValid: false, error: messages.PASSWORD_MIN_LENGTH };
  }

  const regex = new RegExp(REGEX_PASSWORD_PATTERN);

  const isValid = regex.test(password);

  if (isValid) {
    return { isValid };
  } else {
    return { isValid, error: messages.PASSWORD_IS_INVALID };
  }
};

export default useValidatePassword;
