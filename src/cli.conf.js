import meow from 'meow';

export default {
	codes: {
		arrow:{
			left:'\u276e',
			rigth:'\u276f',
		}
	},
	meow: meow(
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
	),
}