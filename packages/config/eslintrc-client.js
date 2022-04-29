const base = require("./eslintrc-base.js");

module.exports = {
	...base,
	env: {
		...base.env,
		browser: true,
	},
	extends: ["airbnb", ...base.extends],
	settings: {
		"import/resolver": {
			node: { extensions: [".ts", ".tsx", ".js", ".jsx", ".json"] },
		},
	},
};
