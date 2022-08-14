import RentForm from "@models/rent/rent.model";

import { useMutation } from "react-query";

import { saveRent } from "../queries";

import { SAVE_RENT } from "../queries/constants";

const useSaveRent = (rentForm: RentForm): any => {
  return useMutation(SAVE_RENT, saveRent(rentForm));
};

export default useSaveRent;
