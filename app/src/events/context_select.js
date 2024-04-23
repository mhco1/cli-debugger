import { context } from '~data.js';

export default (name) => {
    if (!context.c.hasOwnProperty(name)) throw Error('Context not defined');
    context.now = name;
}