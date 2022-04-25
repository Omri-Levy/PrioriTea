import { timeout } from "./timeout";
import { TIMEOUT_IN_MS } from "../../../../config";

export enum Method {
  GET = "get",
  POST = "post",
  PUT = "put",
  PATCH = "patch",
  DELETE = "delete",
}

export const fetchFn = async (
  method: Method,
  url: string,
  body?: Record<string, unknown>
) => {
  try {
    const res = await Promise.race([
      fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: body ? JSON.stringify(body) : undefined,
      }),
      timeout(TIMEOUT_IN_MS),
    ]);
    try {
      const data = await res.json();

      if (!res.ok) {
        throw new Error(`${data.errors[0].message} (${res.status})`);
      }

      return data;
    } catch (err) {
      console.error(res, err);

      return res;
    }
  } catch (err) {
    throw err;
  }
};
