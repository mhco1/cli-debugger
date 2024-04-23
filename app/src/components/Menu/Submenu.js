import React, { useState } from 'react';
import { } from 'ink';
import { } from '@inkjs/ui';
import { Menu, Text } from '~components';
import { codes } from '~data.js';

export default (props) => {
    const back = {
        label: codes.arrow.left.repeat(2),
        _: {
            back: true,
        },
    }

    const [op, setOp] = useState({
        items: [props.items],
        path: ['$'],
    })

    const handleSubmit = (item) => {
        const has = (prop) => Object.hasOwn(item, prop);

        const setSubmenu = (submenu) => {
            const { path, data } =
                Array.isArray(submenu) ?
                    { path: item.label || item.value, data: submenu } :
                    typeof submenu === 'object' ?
                        submenu :
                        undefined;

            op.items = [...op.items, data];
            op.path = [...op.path, path];
            setOp({ ...op });
        }

        const removeItems = () => {
            op.items = op.items.slice(0, -1);
            op.path = op.path.slice(0, -1);
            setOp({ ...op });
        }

        if (has('_')) {
            if (item._.back) return removeItems();
        }

        if (has('submenu')) {
            return setSubmenu(item.submenu)
        };

        if (has('execute')) {
            const execute = () => new Promise(async (resolve, reject) => {
                let res = null;
                try {
                    res = await item.execute();
                } catch (err) {
                    reject(err);
                }
                resolve(res);
            });
            return execute().then(res => {
                setSubmenu(res)
            })
        };

        return props.onSubmit(item);
    }

    const items = op.items.length < 2 ?
        op.items.slice(-1)[0] :
        [back, ...op.items.slice(-1)[0]];

    return <>
        <Text>{op.path.join(` ${codes.arrow.rigth} `)}</Text>
        <Menu.Menu
            {...props}
            items={items}
            onSubmit={handleSubmit}
        />
    </>
}