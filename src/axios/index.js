import Cookies from "js-cookie";
import axios from "axios";
import { API_BASE_URL } from "../utility/constants";

const cookieMeta = {
  path: "",
};

const Axios = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

Axios.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${Cookies.get(
      "idToken",
      cookieMeta
    )}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default Axios;
