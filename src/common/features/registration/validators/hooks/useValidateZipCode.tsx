import { ValidationResult } from "common/types/validation-result.type";

import { messages } from "@constants/messages";
import { isEmpty } from "@utils/common";

const REGEX_ZIP_CODE_PATTERN: RegExp = /^[0-9]*$/;

const useValidateZipCode = (zipCode: string): ValidationResult => {
  if (isEmpty(zipCode)) {
    return { isValid: false, error: messages.ZIP_CODE_IS_REQUIRED };
  }

  const regex = new RegExp(REGEX_ZIP_CODE_PATTERN);

  const isValid = regex.test(zipCode);

  if (isValid) {
    return { isValid };
  } else {
    return { isValid, error: messages.ZIP_CODE_IS_IS_INVALID };
  }
};

export default useValidateZipCode;
