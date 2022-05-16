import {Method} from "@prioritea/types";
import {RequestHandler} from "express";

export type Restful = (methods: Array<Method>) => RequestHandler;
