const base = require("@prioritea/config/eslintrc-client.js");

module.exports = {
	...base,
	"parserOptions": {
		...base.parserOptions,
		project: ["./tsconfig.json"],
	}
};
