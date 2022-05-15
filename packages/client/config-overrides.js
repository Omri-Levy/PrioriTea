const {
	removeModuleScopePlugin,
	override,
	babelInclude
} = require("customize-cra");
const path = require("path");

module.exports = override(
	removeModuleScopePlugin(),
	babelInclude([
		path.resolve("src"),
		path.resolve("../types/src"), // or some other path where your symlinked files are
	])
);
