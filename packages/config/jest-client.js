const base = require("./jest-base.js");

module.exports = {
	...base,
	// A map from regular expressions to paths to transformers
	transform: {
		'^.+\\.tsx?$': 'esbuild-jest',
		'^.+\\.jsx?$': 'esbuild-jest',
	},
	// The test environment that will be used for testing
	testEnvironment: "jsdom",
	// An array of glob patterns indicating a set of files for which coverage information should be collected
	collectCoverageFrom: ["<rootDir>/src/**/*.{js,ts,tsx,jsx}"],
	setupFilesAfterEnv: ["<rootDir>/src/test/setup.ts"],
	// An array of file extensions your modules use
	moduleFileExtensions: [
		"js",
		"jsx",
		"ts",
		"tsx",
		"json",
	],
};
