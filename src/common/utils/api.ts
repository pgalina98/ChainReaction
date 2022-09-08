import axios from "axios";

import setupAxiosInterceptors from "@config/axios-interceptor";

let instance = axios.create();

const TIMEOUT = 1 * 60 * 1000;
instance.defaults.timeout = TIMEOUT;
instance.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

export default setupAxiosInterceptors(instance);
