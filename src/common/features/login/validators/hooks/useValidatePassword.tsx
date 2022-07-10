import { ValidationResult } from "@shared/types/validation-result.type";

import { messages } from "@constants/messages";
import { isEmpty } from "@utils/common";

const useValidatePassword = (password: string): ValidationResult => {
  if (isEmpty(password)) {
    return { isValid: false, error: messages.PASSWORD_IS_REQUIRED };
  }

  return { isValid: true };
};

export default useValidatePassword;
