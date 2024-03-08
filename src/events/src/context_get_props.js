import { context } from '/data';
import { process } from '/utils';

export const _ = async (id, callback) => {

    const node = context.c[context.now];
    const props = (await node.send('props', { id })).result;
    const res = await process.props(props);
    callback(undefined, res);
}