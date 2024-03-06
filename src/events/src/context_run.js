import { context } from '/data';
import { processEvaluate } from '/utils';

export const _ =  async (script, callback) => {
    if (context.now.length == 0) throw Error('No context was selected');

    const node = context.c[context.now];
    const { send } = node;
    const evaluate = (await send('eval', { script })).result;
    const res = await processEvaluate._(evaluate, node);
    callback(undefined, res);
}