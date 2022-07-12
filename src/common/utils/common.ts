import { valuesIn } from "lodash";

export function isString(value: unknown): value is string {
  return typeof value === "string";
}

export function isArray<T>(value: unknown): value is T[] {
  return value instanceof Array;
}

export function isDate(value: unknown): value is Date {
  return value instanceof Date;
}

export function isEmpty(value: any): boolean {
  if (isArray(value)) {
    return value.filter((value) => !isEmpty(value)).length === 0;
  }
  if (undefined === value || value === "" || value === null || value === false) {
    return true;
  }
  if (isDate(value)) {
    return false;
  }
  if (typeof value === "object") {
    return valuesIn(value).filter((value) => !isEmpty(value)).length === 0;
  }

  return false;
}

export function isUndefined(value: any): boolean {
  if (value === undefined || value === "undefined") {
    return true;
  }

  return false;
}

export function isEqual(value: string, valueForComparation: string): boolean {
  if (undefined === value || value === "" || value === null || value === undefined) {
    return false;
  }
  if (
    undefined === valueForComparation ||
    valueForComparation === "" ||
    valueForComparation === null ||
    valueForComparation === undefined
  ) {
    return false;
  }

  return value === valueForComparation;
}
