import { context } from '~data.js';
import { processResult } from '~utils';

export default async (script, callback) => {
    if (context.now.length == 0) throw Error('No context was selected');

    const node = context.c[context.now];
    const evaluate = (await node.send('eval', { script })).result;
    const res = await processResult.evaluate(evaluate);
    callback(undefined, res);
}