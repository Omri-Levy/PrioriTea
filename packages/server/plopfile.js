module.exports = (plop) => {
	plop.setGenerator('helper', () =>
		({
			description: 'Create a helper',
			prompts: [
				{
					type: 'input',
					name: 'name',
					message: 'What is the name of the helper?',
				},
			],
			actions: [
				{
					type: 'add',
					path: 'src/helpers/{{camelCase name}}/{{camelCase' +
						' name}}.ts',
					templateFile: 'plop-templates/helper/helper.ts.hbs',
				},
				{
					type: 'add',
					path: 'src/helpers/{{camelCase name}}/{{camelCase' +
						' name}}.test.ts',
					templateFile: 'plop-templates/component/helper.test.ts.hbs',
				},
				{
					type: 'add',
					path: 'src/helpers/{{camelCase name}}/types.d.ts',
				},
				{
					type: 'add',
					path: 'src/helpers/{{camelCase name}}/interfaces.d.ts',
				},
				{
					type: 'add',
					path: 'src/helpers/{{camelCase name}}/enums.d.ts',
				},
			]}
		));
};
