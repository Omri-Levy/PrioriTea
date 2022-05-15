module.exports = (plop) => {

	plop.setGenerator('component', {
		description: 'Create a reusable component',
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: 'What is the name of the component?',
			}
		],
		actions: [
			{
				type: 'add',
				path: 'src/components/{{pascalCase name}}/{{pascalCase' +
					' name}}.tsx',
				templateFile: 'plop-templates/component/Component.tsx.hbs',
			},
			{
				type: 'add',
				path: 'src/components/{{pascalCase name}}/{{pascalCase' +
					' name}}.test.tsx',
				templateFile: 'plop-templates/component/Component.test.tsx.hbs',
			},
			{
				type: 'add',
				path: 'src/components/{{pascalCase name}}/{{pascalCase' +
					' name}}.module.scss',
			},
			{
				type: 'add',
				path: 'src/components/{{pascalCase name}}/types.d.ts',
			},
			{
				type: 'add',
				path: 'src/components/{{pascalCase name}}/interfaces.d.ts',
			},
			{
				type: 'add',
				path: 'src/components/{{pascalCase name}}/enums.d.ts',
			},
		]
	});

	plop.setGenerator('hook', {
		description: 'Create a reusable hook',
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: 'What is the name of the hook?',
			}
		],
		actions: [
			{
				type: 'add',
				path: 'src/hooks/use{{pascalCase name}}/use{{pascalCase' +
					' name}}.tsx',
				templateFile: 'plop-templates/hook/useHook.tsx.hbs',
			},
			{
				type: 'add',
				path: 'src/hooks/use{{pascalCase name}}/use{{pascalCase' +
					' name}}.test.tsx',
				templateFile: 'plop-templates/hook/useHook.test.tsx.hbs',
			},
			{
				type: 'add',
				path: 'src/hooks/use{{pascalCase name}}/types.d.ts',
			},
			{
				type: 'add',
				path: 'src/hooks/use{{pascalCase name}}/interfaces.d.ts',
			},
			{
				type: 'add',
				path: 'src/hooks/use{{pascalCase name}}/enums.d.ts',
			},
		]
	});

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
