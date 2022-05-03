import {App} from "../core/app";
import {PORT} from "../env/env";
import supertest from "supertest";

const app = new App(Number(PORT)).init().app;
export const request = supertest(app);


