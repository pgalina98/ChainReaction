import setupAxiosInterceptors from "@config/axios-interceptor";
import axios from "axios";

let instance = axios.create();

const TIMEOUT = 1 * 60 * 1000;
instance.defaults.timeout = TIMEOUT;
instance.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

export default setupAxiosInterceptors(instance);
