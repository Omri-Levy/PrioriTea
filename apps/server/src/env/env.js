"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BASE_URL = exports.DOMAIN = exports.SECRET_ACCESS_TOKEN = exports.CORS_ORIGIN = exports.DB_URL = exports.PORT = exports.NODE_ENV = void 0;
var undefined_env_var_1 = require("./undefined-env-var");
var envVars = [
    "PORT",
    "CORS_ORIGIN",
    "SECRET_ACCESS_TOKEN",
    "DOMAIN",
    "BASE_URL",
];
// Throws an error is a required env variable is undefined.
// if (!process.env.[KEY]) { throw error }
envVars.forEach(function (env) {
    (0, undefined_env_var_1.undefinedEnvVar)(env);
});
var _a = process.env, NODE_ENV = _a.NODE_ENV, PORT = _a.PORT, DB_URL = _a.DB_URL, CORS_ORIGIN = _a.CORS_ORIGIN, SECRET_ACCESS_TOKEN = _a.SECRET_ACCESS_TOKEN, DOMAIN = _a.DOMAIN, BASE_URL = _a.BASE_URL;
exports.NODE_ENV = NODE_ENV;
exports.PORT = PORT;
exports.DB_URL = DB_URL;
exports.CORS_ORIGIN = CORS_ORIGIN;
exports.SECRET_ACCESS_TOKEN = SECRET_ACCESS_TOKEN;
exports.DOMAIN = DOMAIN;
exports.BASE_URL = BASE_URL;
