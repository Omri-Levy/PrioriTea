const base = require("./jest-base.js");

module.exports = {
	...base,
	// A map from regular expressions to paths to transformers
	transform: {
		"^.+\\.ts$": "esbuild-jest",
		"^.+\\.js$": "esbuild-jest",
	},
	// The test environment that will be used for testing
	testEnvironment: "node",
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
