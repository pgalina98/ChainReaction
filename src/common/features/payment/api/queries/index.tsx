import { Token } from "react-stripe-checkout";

import axios from "@utils/api";

export const handleStripeToken = async (
  token: Token,
  amount: number,
  onSuccess: any,
  onError: any
): Promise<void> => {
  await axios
    .get("/payments/charge", {
      headers: { token: token?.id, amount },
    })
    .then(() => onSuccess())
    .catch((error) => onError(error));
};
