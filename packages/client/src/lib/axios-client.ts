import axios from "axios";
import {TIMEOUT_IN_MS} from "../config";

/**
 * An instance of axios with the app's url, a timeout, and the auth header set to be sent with every request.
 */
export const axiosClient = axios.create({
	baseURL: `${process.env.REACT_APP_API_URL}/`,
	timeout: TIMEOUT_IN_MS,
	withCredentials: true,
});
