import { RequestHandler } from 'express';
import { MethodNotAllowed } from '../errors/method-not-allowed';

export enum Method {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
	PATCH = 'PATCH',
}

//
// This shortcut function responses with HTTP 405
// to the requests having a method that does not
// have corresponding request handler. For example
// if a resource allows only GET and POST requests
// then PUT, DELETE, etc requests will be responded
// with the 405 status code. HTTP 405 is required to have Allow
// header set to a list of allowed methods so in
// this case the response has "Allow: GET, POST" in
// its headers [1].
//
// Example usage
//
//     A handler that allows only GET requests and returns
//
//     const controller = (req, res) => {
//         restful(req, res, {
//             get: function (req, res) {
//                 res.send(200, 'Hello restful world.');
//             }
//         });
//     }
//
// References
//
//     [1] RFC-2616, 10.4.6 405 Method Not Allowed
//     https://tools.ietf.org/html/rfc2616#page-66
//
//     [2] Express.js request method
//     https://expressjs.com/en/guide/routing.html
//
const restful = function (methods: Array<Method>) {
	return function (req, res, next) {
		const { method } = req; // [2]

		if (!methods.includes(method as Method)) {
			res.set(`Allow`, methods.join(`, `));

			throw new MethodNotAllowed();
		} else {
			next();
		}
	} as RequestHandler;
};

export { restful };
