import { has } from '../test.js';
import { context } from '~/data.js';

export default (name) => {
    if (!has.context(name)) throw Error('Context not defined');
    context.now = name;
}