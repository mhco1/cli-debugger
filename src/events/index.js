import { EventEmitter } from 'node:events'
import * as events from './events/index.js'

const event = new EventEmitter;

Object.keys(events).forEach(name => {
    const fn = (events[name]).default;
    event.on(name, fn);
})

export { event }