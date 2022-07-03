import { ValidationResult } from "@shared/types/validation-result.type";

import { messages } from "@constants/messages";
import { isEmpty, isEqual } from "@utils/common";

const REGEX_CONFIRMATION_PASSWORD_PATTERN: RegExp = /^\S+$/;

const useValidateConfirmationPassword = (
  confirmationPassword: string,
  password: string | undefined
): ValidationResult => {
  if (isEmpty(confirmationPassword)) {
    return { isValid: false, error: messages.CONFIRMATION_PASSWORD_IS_REQUIRED };
  }

  if (confirmationPassword.length < 8) {
    return { isValid: false, error: messages.CONFIRMATION_PASSWORD_MIN_LENGTH };
  }

  const regex = new RegExp(REGEX_CONFIRMATION_PASSWORD_PATTERN);

  const isValid = regex.test(confirmationPassword);

  if (isValid) {
    if (!isEqual(confirmationPassword, password!)) {
      return { isValid: false, error: messages.CONFIRMATION_PASSWORD_NOT_MATCH };
    }

    return { isValid };
  } else {
    return { isValid, error: messages.CONFIRMATION_PASSWORD_IS_INVALID };
  }
};

export default useValidateConfirmationPassword;
