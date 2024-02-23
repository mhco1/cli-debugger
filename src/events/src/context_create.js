import childProcess from 'child_process';
import path from 'path';
import { uuid } from '/utils';
import { context } from '/data';
import { is, has } from '../test.js';

export const _ = (name, op = {}) => {
    if (!is.context.validFormat(name)) throw Error('Invalid format to new context');
    if (has.context(name)) throw Error('There is already a context with this name');

    const dir = path.resolve('./dist/server.js');
    const node = childProcess.fork(dir, {
        env: {
            NAME: name,
        }
    });

    const requests = {};
    context.c[name] = {
        ...op,
        name,
        node,
        send: (exe, data) => new Promise((resolve, reject) => {
            const id = uuid._();
            requests[id] = (err, res) => err ? reject(err) : resolve(res);
            node.send({ exe, id, data });
        }),
    };

    node.on('message', (data) => {
        const { id, res, err } = data;
        requests[id](err, res);
        delete requests[id];
    })
}