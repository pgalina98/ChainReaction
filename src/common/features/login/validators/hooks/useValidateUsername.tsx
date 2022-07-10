import { ValidationResult } from "@shared/types/validation-result.type";

import { messages } from "@constants/messages";
import { isEmpty } from "@utils/common";

const useValidateUsername = (username: string): ValidationResult => {
  if (isEmpty(username)) {
    return { isValid: false, error: messages.USERNAME_IS_REQUIRED };
  }

  return { isValid: true };
};

export default useValidateUsername;
