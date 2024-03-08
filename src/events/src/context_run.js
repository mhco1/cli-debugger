import { context } from '/data';
import { process } from '/utils';

export const _ =  async (script, callback) => {
    if (context.now.length == 0) throw Error('No context was selected');

    const node = context.c[context.now];
    const evaluate = (await node.send('eval', { script })).result;
    const res = await process.evaluate(evaluate);
    callback(undefined, res);
}