#!/usr/bin/env node

import 'dotenv/config';
import React from 'react';
import { render } from 'ink';
import { event } from '/events';
import { cli } from '/data'
import App from '/src/App.js';
import AppTest from '/src/App.test.js';

const { waitUntilExit } = render(cli.flags.experiment ? <AppTest /> : <App />);

waitUntilExit().then(() => {
	event.emit('exit');
})