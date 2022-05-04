import request, { Response } from "supertest";
import { App } from "../core/app";
import { db } from "../core/db/db";
import { Method, MethodUnion } from "@prioritea/types";
import { BASE_URL, PORT } from "../env/env";

const app = new App(Number(PORT)).init().app;
const agent = request.agent(app);

const invalidValues = [undefined, true, false, {}, 0, [], "", function () {}];
const badEmails = [
	"example@",
	"@example.com",
	"example@example.",
	"example@example",
	"example.com",
	"בדיקה@example",
	"example@בדיקה",
	"בדיקה@בדיקה",
	"e",
	"",
	...invalidValues,
];
const expectStatus = function (res: Response, statusCode: number) {
	return expect(res.status).toBe(statusCode);
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

describe("sign-up email", function () {
	beforeAll(async function () {
		await db.user.delete({
			where: { email: "test@test.com" },
		});
	});

	badEmails.forEach(function (email) {
		it(`validates email on sign-up ${email}`, async function () {
			const res = await agentFetch(Method.POST, "/auth/sign-up", {
				email: email as string,
				name: "John Doe",
				password: "123!@#qweQWE",
				passwordConfirmation: "123!@#qweQWE",
			});

			expectStatus(res, 400);
			expect(res.body.errors[0].field).toBe("email");

			if (typeof email !== "string") {
				const expecting = Array.isArray(email) ? "array" : typeof email;

				expect(res.body.errors[0].message).toBe(
					email === undefined || typeof email === "function"
						? "Required"
						: `Expected string, received ${expecting}`
				);
			} else {
				expect(res.body.errors[0].message).toBe(
					`Email must contain a \"@\", preceded and followed by English characters, numbers, and special characters, and may not contain two consecutive \".\"s`
				);
			}
		});
	});

	it("handles email already in use", async function () {
		const successRes = await agentFetch(Method.POST, "/auth/sign-up", {
			email: "test@test.com",
			name: "John Doe",
			password: "123!@#qweQWE",
			passwordConfirmation: "123!@#qweQWE",
		});

		expectStatus(successRes, 201);

		const failureRes = await agentFetch(Method.POST, "/auth/sign-up", {
			email: "test@test.com",
			name: "John Doe",
			password: "123!@#qweQWE",
			passwordConfirmation: "123!@#qweQWE",
		});

		expectStatus(failureRes, 400);
		expect(failureRes.body.errors[0].message).toBe("Email already in use");
	});
});
