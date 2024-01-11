import childProcess from 'node:child_process';
import path from 'node:path';
import uuid from '~/utils/uuid.js';
import { context } from '~/data.js';
import { is, has } from '../test.js';

export default (name) => {
    if (!is.context.validFormat(name)) throw Error('Invalid format to new context');
    if (has.context(name)) throw Error('There is already a context with this name');

    const dir = path.resolve(process.env.ROOT, 'dist/server.js');
    const node = childProcess.fork(dir, {
        env: {
            NAME: name,
        }
    });

    const requests = {};
    context.c[name] = {
        node,
        history: [],

        send: (exe, data) => new Promise((resolve, reject) => {
            const id = uuid();
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