import { is } from '../test.js';
import { context } from '~/data.js';
import processEvaluate from '~/utils/processEvaluate.js'

export default async (script, callback) => {
    if (!is.context.select()) throw Error('No context was selected');

    const node = context.c[context.now];
    const { send } = node;
    const evaluate = (await send('eval', { script })).result;
    const res = await processEvaluate(evaluate, node);
    callback(undefined, res);
}