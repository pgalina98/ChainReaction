import { LOCAL_STORAGE_KEYS } from "@enums/local-storage-keys";

export const clearLocalStorage = () => {
  Object.values(LOCAL_STORAGE_KEYS).forEach((value) => localStorage.remove(value));
};

export const clearAuthenticationToken = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTHENTICATION_TOKEN);
  localStorage.removeItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
};

export const setValue = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const getValueByKey = (key: string): string | null => {
  return localStorage.getItem(key) || null;
};
