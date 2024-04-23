import { createServer } from '~utils';
import { context } from '~data.js';

export default (name = '', op = {}) => {
    const format = /^[A-z][A-z|0-9]*$/g;
    if (!format.test(name)) throw Error('Invalid format to new context');
    if (context.c.hasOwnProperty(name)) throw Error('There is already a context with this name');

    context.c[name] = createServer(name, op);
}