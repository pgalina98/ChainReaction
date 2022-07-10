import { ValidationResult } from "common/types/validation-result.type";

import { messages } from "@constants/messages";
import { isEmpty } from "@utils/common";

const REGEX_USERNAME_PATTERN: RegExp = /^[a-zA-Z_0-9]+$/;

const useValidateUsername = (username: string): ValidationResult => {
  if (isEmpty(username)) {
    return { isValid: false, error: messages.USERNAME_IS_REQUIRED };
  }

  const regex = new RegExp(REGEX_USERNAME_PATTERN);

  const isValid = regex.test(username);

  if (isValid) {
    return { isValid };
  } else {
    return { isValid, error: messages.USERNAME_IS_INVALID };
  }
};

export default useValidateUsername;
