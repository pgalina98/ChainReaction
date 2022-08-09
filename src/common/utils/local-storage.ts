import { LocalStorageKeys } from "@enums/local-storage-keys";

export const clearLocalStorage = () => {
  Object.values(LocalStorageKeys).forEach((value) =>
    localStorage.remove(value)
  );
};

export const clearAuthenticationToken = () => {
  localStorage.removeItem(LocalStorageKeys.AUTHENTICATION_TOKEN);
  localStorage.removeItem(LocalStorageKeys.REFRESH_TOKEN);
};

export const clearActiveTab = () => {
  localStorage.removeItem(LocalStorageKeys.ACTIVE_TAB);
};

export const setValue = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const getValueByKey = (key: string): string | null => {
  return localStorage.getItem(key) || null;
};
