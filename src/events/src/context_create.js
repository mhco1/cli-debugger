import { createServer } from '/utils';
import { context } from '/data';

export const _ = (name = '', op = {}) => {
    const format = /^[A-z][A-z|0-9]*$/g;
    if (!format.test(name)) throw Error('Invalid format to new context');
    if (context.c.hasOwnProperty(name)) throw Error('There is already a context with this name');

    context.c[name] = createServer._(name, op);
}