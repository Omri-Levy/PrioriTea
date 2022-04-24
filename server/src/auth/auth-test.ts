import request, { Response } from "supertest";
import { App } from "../core/app";
import { Method, MethodUnion } from "../enums";
import { BASE_URL, PORT } from "../env/env";

const app = new App(Number(PORT)).init().app;
const agent = request.agent(app);

const badMethods: Array<Method> = [Method.PUT, Method.PATCH, Method.DELETE];
const expectStatus = function (res: Response, statusCode: number) {
	return expect(res.status).toBe(statusCode);
};
const expectError = function (res: Response, text: string) {
	return expect(res.body.errors[0]?.message).toBe(text);
};
const agentFetch = async function (
	method: Method,
	url: string,
	body?: Record<string, string>
) {
	return agent[method as MethodUnion](`/${BASE_URL}${url}`)
		.set("Accept", "application/json")
		.send(body);
};
const routes = [
	{
		method: Method.POST,
		route: "/auth/sign-up",
		auth: false,
	},
	{
		method: Method.POST,
		route: "/auth/sign-in",
		auth: false,
	},
	{
		method: Method.POST,
		route: "/auth/sign-out",
		auth: true,
	},
	{
		method: Method.GET,
		route: "/auth/user-info",
		auth: true,
	},
];

describe("auth", function () {
	it("handles 404", async function () {
		const res = await agentFetch(Method.GET, `/auth`);

		expectStatus(res, 404);
		expectError(res, "Route not found.");
	});

	routes.forEach(function ({ method, route, auth }) {
		it(`finds the ${method.toUpperCase()} ${route} route`, async function () {
			const res = await agentFetch(method, route);

			expect(res.status).not.toBe(404);
			expect(res.body.errors[0].message).not.toBe("Route not found.");
		});

		it(`handles auth ${method.toUpperCase()} ${route} route`, async function () {
			const res = await agentFetch(method, route);

			if (auth) {
				expect(res.body.errors[0].message).toBe("Unauthorized.");
				expect(res.status).toBe(401);
			} else {
				expect(res.body.errors[0].message).not.toBe("Unauthorized.");
				expect(res.status).not.toBe(401);
			}
		});
	});

	badMethods.forEach(function (mtd) {
		it(`handles wrong method ${mtd.toUpperCase()}`, async function () {
			const res = await agentFetch(mtd, `/auth`);

			expectStatus(res, 405);
			expectError(res, "Method not allowed.");
		});
	});
});
