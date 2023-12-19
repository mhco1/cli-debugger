#!/usr/bin/env node

// import 'dotenv/config';
import React from 'react';
import {render} from 'ink';
import meow from 'meow';
import App from '#src/app.js';

const cli = meow(
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

render(<App {...cli.flags} />);
