import {badMethods, routes} from "./fixtures";
import {BASE_URL} from "../env/env";
import {request} from "../tests/fixtures";


it("handles 404", async () => {
	const res = await request.get(`/${BASE_URL}auth`);

	expect(res.status).toBe(404);
	expect(res.body.errors[0]?.message).toBe("Route not found.");
});

routes.forEach(({method, route, auth}) => {
	it(`finds the ${method.toUpperCase()} ${route} route`, async () => {
		// @ts-ignore
		const res = await request[method](`/${BASE_URL}/${route}`);

		expect(res.status).not.toBe(404);
		expect(res.body.errors[0].message).not.toBe("Route not found.");
	});

	it(`handles auth ${method.toUpperCase()} ${route} route`, async () => {
		// @ts-ignore
		const res = await request[method](`/${BASE_URL}/${route}`);

		if (auth) {
			expect(res.body.errors[0].message).toBe("Unauthorized.");
			expect(res.status).toBe(401);
		} else {
			expect(res.body.errors[0].message).not.toBe("Unauthorized.");
			expect(res.status).not.toBe(401);
		}
	});
});

badMethods.forEach((mtd) => {
	it(`handles wrong method ${mtd.toUpperCase()}`, async () => {
		// @ts-ignore
		const res = await request[mtd](`/${BASE_URL}/auth`);

		expect(res.status).toBe(405);

		expect(res.body.errors[0]?.message).toBe("Method not allowed.");
	});
});
