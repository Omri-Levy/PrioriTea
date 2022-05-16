module.exports = {
	env: {
		node: true,
		es6: true,
	},
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: 13,
		sourceType: "module",
	},
	extends: ["airbnb-typescript", "prettier"],
	plugins: ["prettier"],
	rules: {
		"prettier/prettier": "error",
	},
	ignorePatterns: ["node_modules", "dist",  ".turbo", "coverage"],
};
