import { AxiosInstance } from "axios";

import { getValueByKey } from "@utils/local-storage";

const setupAxiosInterceptors = (instance: AxiosInstance): AxiosInstance => {
  const onRequestSuccess = (config) => {
    const token = getValueByKey("authenticationToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  };
  const onResponseSuccess = (response) => response;
  const onResponseError = (error) => {
    return Promise.reject(error);
  };

  instance.interceptors.request.use(onRequestSuccess);
  instance.interceptors.response.use(onResponseSuccess, onResponseError);

  return instance;
};

export default setupAxiosInterceptors;
