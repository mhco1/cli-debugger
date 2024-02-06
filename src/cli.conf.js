import meow from 'meow';

export default meow(
	`
		Usage
		  $ cli-debugger

		Options
			--name  Your name

		Examples
		  $ cli-debugger --name=Jane
		  Hello, Jane
	`,
	{
		importMeta: import.meta,
	},
);
