import axios from "axios";

import { getValueByKey } from "@utils/local-storage";

const TIMEOUT = 1 * 60 * 1000;
axios.defaults.timeout = TIMEOUT;
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const setupAxiosInterceptors = () => {
  const onRequestSuccess = (config) => {
    const token = getValueByKey("authenticationToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  };
  const onResponseSuccess = (response) => response;
  const onResponseError = (error) => {
    const status = error.status || (error.response ? error.response.status : 0);

    return Promise.reject(error);
  };
  axios.interceptors.request.use(onRequestSuccess);
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export default setupAxiosInterceptors;
