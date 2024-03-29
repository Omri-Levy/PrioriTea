import {camelCase, capitalize, kebabCase, snakeCase, startCase} from "lodash";

export const stringUtils = (str: string) => {
	class StringUtils extends String {
		constructor(_str: string = str) {
			super(_str);
		}

		get string() {
			return this.toString();
		}

		public toSnakeCase() {
			return new StringUtils(snakeCase(this.toString()));
		}

		public toKebabCase() {
			return new StringUtils(kebabCase(this.toString()));
		}

		public toCapitalized() {
			return new StringUtils(capitalize(this.toString()));
		}

		public toTitleCase() {
			return new StringUtils(startCase(this.toString()));
		}

		public toCamelCase() {
			return new StringUtils(camelCase(this.toString()));
		}

		public toPascalCase() {
			return new StringUtils(startCase(camelCase(this.toString())));
		}

		public toScreamingSnakeCase() {
			return new StringUtils(this.toSnakeCase().toUpperCase());
		}
	}

	return new StringUtils();
}

