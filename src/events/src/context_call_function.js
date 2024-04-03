import { context } from '/data';
import { process } from '/utils';

export const _ = async (id, _parameters, callback) => {
    if (context.now.length == 0) throw Error('No context was selected');

    const node = context.c[context.now];
    const parameters = [];

    for (const script of _parameters) {
        const { value, objectId } = (await node.send('eval', { script })).result;
        parameters.push({ value, objectId });
    }

    const evaluate = (await node.send('call', { id, parameters })).result;
    const res = await process.evaluate(evaluate);
    callback(undefined, res);
}