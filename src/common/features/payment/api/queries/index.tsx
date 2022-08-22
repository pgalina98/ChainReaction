import { Token } from "react-stripe-checkout";

import axios from "@utils/api";

export const handleStripeToken = async (token: Token): Promise<void> => {
  await axios
    .get("/payments/charge", {
      headers: { token: token?.id, amount: 500 },
    })
    .then(() => alert("Payment successfull"))
    .catch((error) => console.log("error: ", error));
};
