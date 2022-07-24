import { AxiosInstance } from "axios";

import HttpStatusCode from "@enums/http-status-code";

import { getValueByKey, clearAuthenticationToken } from "@utils/local-storage";

const setupAxiosInterceptors = (instance: AxiosInstance): AxiosInstance => {
  const onRequestSuccess = (config) => {
    const token = getValueByKey("authenticationToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  };
  const onRequestError = (error) => {
    if (error.response.status === HttpStatusCode.UNAUTHORIZED) {
      clearAuthenticationToken();
    }
    return Promise.reject(error);
  };
  const onResponseSuccess = (response) => response;
  const onResponseError = (error) => {
    return Promise.reject(error);
  };

  instance.interceptors.request.use(onRequestSuccess, onRequestError);
  instance.interceptors.response.use(onResponseSuccess, onResponseError);

  return instance;
};

export default setupAxiosInterceptors;
