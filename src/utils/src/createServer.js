import childProcess from 'child_process';
import path from 'path';
import { uuid } from '/utils';

export const _ = (name, op = {}) => {
    if(typeof name == 'undefined') throw Error('Name not defined to crate server');
    const requests = {};
    const dir = path.resolve('./dist/server.js');
    const node = childProcess.fork(dir, {
        env: {
            NAME: name,
        }
    });

    node.on('message', (data) => {
        const { id, err, res } = data;
        requests[id](err, res);
        delete requests[id];
    })

    return {
        ...op,
        name,
        node,
        send: (exe, data) => new Promise((resolve, reject) => {
            const id = uuid._();
            requests[id] = (err, res) => err ? reject(err) : resolve(res);
            node.send({ exe, id, data });
        }),
    };
}