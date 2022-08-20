import { ValidationResult } from "common/types/validation-result.type";

import { messages } from "@constants/messages";
import { isEmpty } from "@utils/common";

const REGEX_CITY_PATTERN: RegExp = /^[A-Za-z\s]*$/;

const useValidateCity = (city: string): ValidationResult => {
  if (isEmpty(city)) {
    return { isValid: false, error: messages.CITY_IS_REQUIRED };
  }

  const regex = new RegExp(REGEX_CITY_PATTERN);

  const isValid = regex.test(city);

  if (isValid) {
    return { isValid };
  } else {
    return { isValid, error: messages.CITY_IS_INVALID };
  }
};

export default useValidateCity;
