import { context } from '~data.js';
import { processResult } from '~utils';

export default async (id, callback) => {
    const node = context.c[context.now];
    const props = (await node.send('props', { id })).result;
    const res = await processResult.props(props);
    callback(undefined, res);
}