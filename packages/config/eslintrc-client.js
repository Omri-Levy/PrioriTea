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
			node: {extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]},
		},
	},
	rules: {
		'react/prop-types': 'off',
		'import/prefer-default-export': 'off',
		'react/react-in-jsx-scope': 'off',
		'react/jsx-props-no-spreading': 'off',
		'react/function-component-definition': ['error', {
			namedComponents: 'arrow-function',
			unnamedComponents: 'arrow-function'
		}],
		'react/jsx-curly-brace-presence': 'off'
	},
};
