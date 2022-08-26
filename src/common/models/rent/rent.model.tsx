import { Dayjs } from "dayjs";

import dayjs from "@utils/dayjs";

import { ProductSize } from "@enums/product-size";

import Product from "@models/product/product.model";
import Location from "@models/location/location.model";

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
  return {
    idUser: null as any,
    product: null as any,
    helmet: null as any,
    helmetSize: null as any,
    location: null as any,
    date: dayjs(),
    timeslots: [],
  };
};
