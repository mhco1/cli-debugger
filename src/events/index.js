import { EventEmitter } from 'events';
import * as mod from './src/*.js';

export const event = new EventEmitter;

Object.keys(mod).forEach(name => {
    if (typeof mod[name]._ == 'undefined') return
    const fn = mod[name]._;
    event.on(name, fn);
})