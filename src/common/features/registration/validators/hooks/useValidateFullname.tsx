import { ValidationResult } from "common/types/validation-result.type";

import { messages } from "@constants/messages";
import { isEmpty } from "@utils/common";

const REGEX_FULLNAME_PATTERN: RegExp = /^[a-zA-ZŽžČčĆćĐđŠš-]+(?:\s[a-zA-ZŽžČčĆćĐđŠš-]+)+$/;

const useValidateFullname = (fullname: string): ValidationResult => {
  if (isEmpty(fullname)) {
    return { isValid: false, error: messages.FULLNAME_IS_REQUIRED };
  }

  const regex = new RegExp(REGEX_FULLNAME_PATTERN);

  const isValid = regex.test(fullname);

  if (isValid) {
    return { isValid };
  } else {
    return { isValid, error: messages.FULLNAME_IS_INVALID };
  }
};

export default useValidateFullname;
