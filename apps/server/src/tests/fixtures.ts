import {App} from "../core/app";
import {VITE_PORT} from "../env/env";
import supertest from "supertest";

const app = new App(Number(VITE_PORT)).init().app;

export const request = supertest(app);


