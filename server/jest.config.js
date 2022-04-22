module.exports = {
	...require("./jest-base.js"),
	setupFilesAfterEnv: ["<rootDir>/src/test/setup.ts"],
};
