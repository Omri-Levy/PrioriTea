import { Response } from "express";
import { getUser } from "./get-user";

export const getUserId = function(res: Response) {
    return getUser(res)?.id;
}
