const base = require("./eslintrc-base.js");

module.exports = {
	...base,
	extends: ["airbnb-base", ...base.extends],
	settings: {
		"import/resolver": {
			node: { extensions: [".ts", ".js", ".json"] },
		},
	},
};
