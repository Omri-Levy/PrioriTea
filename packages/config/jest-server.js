module.exports = {
	...require("./jest-base.js"),
	// An array of glob patterns indicating a set of files for which coverage information should be collected
	collectCoverageFrom: ["<rootDir>/src/**/*.{js,ts}"],
	setupFilesAfterEnv: ["<rootDir>/src/test/setup.ts"],
};
