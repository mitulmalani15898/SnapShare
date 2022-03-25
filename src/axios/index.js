import Cookies from "js-cookie";
import axios from "axios";
import { API_BASE_URL } from "../utility/constants";

export default axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    Authorization: `Bearer ${Cookies.get("accessToken", { path: "" })}`,
  },
});
