import axios from "axios";
import { TIMEOUT_IN_MS } from "../config";

export const axiosClient = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/`,
  timeout: TIMEOUT_IN_MS,
  withCredentials: true,
});