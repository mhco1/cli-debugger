import { createServer } from '/utils';
import { context } from '/data';
import { is, has } from '../test.js';

export const _ = (name = '', op = {}) => {
    if (!is.context.validFormat(name)) throw Error('Invalid format to new context');
    if (has.context(name)) throw Error('There is already a context with this name');

    context.c[name] = createServer._(name, op);
}