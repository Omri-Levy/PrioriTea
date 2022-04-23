import request, { Response } from "supertest";
import { App } from "../core/app";
import { BASE_URL, PORT } from "../env/env";

const app = new App(Number(PORT)).init().app;
const agent = request.agent(app);

type Method = "put" | "patch" | "delete" | "get" | "post";

const badMethods: Array<Method> = ["put", "patch", "delete"];
const expectStatus = function (res: Response, statusCode: number) {
	return expect(res.status).toBe(statusCode);
};
const expectText = function (res: Response, text: string) {
	return expect(res.text).toContain(text);
};
const agentFetch = async function (
	method: Method,
	url: string,
	body?: Record<string, string>
) {
	return agent[method](`/${BASE_URL}${url}`)
		.set("Accept", "application/json")
		.send(body);
};

describe("auth", function () {
	it("handles 404", async function () {
		const res = await agentFetch("get", `/auth`);

		expectStatus(res, 404);
		expectText(res, "Route not found.");
	});

	badMethods.forEach(function (mtd) {
		it(`handles wrong method ${mtd.toUpperCase()}`, async function () {
			const res = await agentFetch(mtd, `/auth`);

			expectStatus(res, 405);
			expectText(res, "Method not allowed.");
		});
	});

	it("handles missing fields on sign-up", async function () {
		const res = await agentFetch("post", "/auth/sign-up");

		expectStatus(res, 200);
	});
});
