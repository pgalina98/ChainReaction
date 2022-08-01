import { Dayjs } from "dayjs";

import dayjs from "@utils/dayjs";

import jwtDecode from "jwt-decode";

import { LoaclStorageKeys } from "@enums/local-storage-keys";
import { ProductSize } from "@enums/product-size";
import { Location } from "@enums/location";

import Product from "@models/product.model";
import User from "@models/user.model";

import mapJwtClaimsToUserObject from "@mappers/mapJwtClaimsToUserObject";

import { getValueByKey } from "@utils/local-storage";

export default interface RentForm {
  idUser: number;
  product: Product;
  helmet: Product;
  helmetSize: ProductSize;
  location: Location;
  date: Dayjs;
  timeslots: Dayjs[];
}

export const createEmptyRentFormObject = (): RentForm => {
  const jwtClaims: any = jwtDecode(
    getValueByKey(LoaclStorageKeys.AUTHENTICATION_TOKEN)!
  );

  const user: User = mapJwtClaimsToUserObject(jwtClaims);

  return {
    idUser: user.id!,
    product: null as any,
    helmet: null as any,
    helmetSize: null as any,
    location: null as any,
    date: dayjs(),
    timeslots: [],
  };
};
