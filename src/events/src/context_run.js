import { context } from '/data';
import { processEvaluate } from '/utils';
import { is } from '../test.js';

export const _ =  async (script, callback) => {
    if (!is.context.select()) throw Error('No context was selected');

    const node = context.c[context.now];
    const { send } = node;
    const evaluate = (await send('eval', { script })).result;
    const res = await processEvaluate._(evaluate, node);
    callback(undefined, res);
}