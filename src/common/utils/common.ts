import { valuesIn } from "lodash";

export interface ClassesAsProps {
  [name: string]: boolean;
}

export type ClassesAsArray = string[];

export type Classifiable = string | ClassesAsProps | ClassesAsArray;

export function classify(...classes: Classifiable[]): ClassesAsArray {
  const result = classes
    .map((value) => {
      if (isString(value)) {
        return value.split(" ");
      } else if (isArray(value)) {
        return value
          .map((className) => classify(className))
          .reduce(arrayReducer, []);
      }
      return Object.keys(value)
        .map((key) => (value[key] ? classify(key) : []))
        .filter((value) => value.length > 0)
        .reduce(arrayReducer, []);
    })
    .reduce(arrayReducer, []);

  return noDupes(noEmpty(result));

  function arrayReducer(array: string[], item: string[]) {
    return [...array, ...item];
  }
}

export function declassify(...classes: Classifiable[]): string {
  return classify(...classes).join(" ");
}

export function noDupes<T = any>(inArray: T[]): T[] {
  return [...new Set(inArray)];
}

export function noEmpty<T = any>(inArray: T[]): T[] {
  return inArray.filter((value) => !isEmpty(value));
}

export function toString(value: any): string {
  return value?.toString();
}

export function toBoolean(value: any): boolean {
  if (value === "true") {
    return true;
  } else {
    return false;
  }
}

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
  if (
    undefined === value ||
    value === "" ||
    value === null ||
    value === false
  ) {
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

export function isNullOrUndefined(value: any): boolean {
  if (isNull(value) || isUndefined(value)) {
    return true;
  }

  return false;
}

export function isNull(value: any): boolean {
  if (value === null || value === "null") {
    return true;
  }

  return false;
}

export function isUndefined(value: any): boolean {
  if (value === undefined || value === "undefined") {
    return true;
  }

  return false;
}

export function isEqual(value: string, valueForComparison: string): boolean {
  if (
    undefined === value ||
    value === "" ||
    value === null ||
    value === undefined
  ) {
    return false;
  }
  if (
    undefined === valueForComparison ||
    valueForComparison === "" ||
    valueForComparison === null ||
    valueForComparison === undefined
  ) {
    return false;
  }

  return value === valueForComparison;
}

export function range(from: number, to: number) {
  console.log("from: ", from);
  console.log("to: ", to);

  return new Array(to - from + 1).fill(null).map((_, index) => index + from);
}
