import axios from "axios";
import { REACT_APP_API_ENDPOINT } from "../base/baseUrl";

const authClient = axios.create({
  baseURL: REACT_APP_API_ENDPOINT,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default authClient;
