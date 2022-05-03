const base = require("./jest-base.js");

module.exports = {
	...base,
	// An array of glob patterns indicating a set of files for which coverage information should be collected
	collectCoverageFrom: ["<rootDir>/src/**/*.{js,ts}"],
	setupFilesAfterEnv: ["<rootDir>/src/tests/setup.ts"],
	// An array of file extensions your modules use
	moduleFileExtensions: [
		"js",
		"ts",
		"json",
		"node",
	],
};
