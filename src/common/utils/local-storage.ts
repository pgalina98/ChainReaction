import { LoaclStorageKeys } from "@enums/local-storage-keys";

export const clearLocalStorage = () => {
  Object.values(LoaclStorageKeys).forEach((value) => localStorage.remove(value));
};

export const clearAuthenticationToken = () => {
  localStorage.removeItem(LoaclStorageKeys.AUTHENTICATION_TOKEN);
  localStorage.removeItem(LoaclStorageKeys.REFRESH_TOKEN);
};

export const setValue = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const getValueByKey = (key: string): string | null => {
  return localStorage.getItem(key) || null;
};
