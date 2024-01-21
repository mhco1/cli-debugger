import { has } from '../test.js';
import { context } from '/data';

export const _ =  (name) => {
    if (!has.context(name)) throw Error('Context not defined');
    context.now = name;
}