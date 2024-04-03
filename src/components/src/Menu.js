import React, { useMemo, useState } from 'react';
import { } from 'ink';
import { TextInput } from '@inkjs/ui';
import { MenuSimple, Text } from '/components';
import { componentExternalUpdate } from '/utils';
import { codes } from '/data';

const Menu = (props) => <MenuSimple._ {...props} />

export const submenu = (props) => {

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
        <Text._>{op.path.join(` ${codes.arrow.rigth} `)}</Text._>
        <MenuSimple._
            {...props}
            items={items}
            onSubmit={handleSubmit}
        />
    </>
}

export const list = (props) => {
    const buttons = (props.buttons || []).map(el => {
        el.value.type = 'button';
        return el;
    });
    const numButtons = buttons.length;

    const createItem = (iniActive = false) => {
        const value = { type: 'item', update: null, isUndefined: true, txt: '' };

        const Parameter = () => {
            const [activeControl, useActive] = useMemo(() => {
                const res = componentExternalUpdate._();
                value.update = res[0].update;
                return res;
            });
            const active = useActive(iniActive);

            const handleSubmit = (_value) => {
                const lastItem = op.items.slice(-1 - numButtons)[0];
                value.txt = _value;
                value.isUndefined = value.txt.length == 0;
                op.active = true;
                op.items = lastItem.value.isUndefined ?
                    [...op.items] :
                    numButtons == 0 ? [
                        ...op.items,
                        createItem(),
                    ] : [
                        ...op.items.slice(0, -numButtons),
                        createItem(),
                        ...op.items.slice(-numButtons),
                    ]
                    ,

                    activeControl.update(false);
                setOp({ ...op });
            }

            return <>
                {
                    active ?
                        <>
                            <Text._>::</Text._>
                            <TextInput
                                placeholder='type...'
                                onSubmit={handleSubmit}
                            />
                        </> :
                        value.txt.length < 1 ?
                            <Text._.gray>undefined</Text._.gray> :
                            <Text._ >{value.txt}</Text._>
                }
            </>
        }

        return {
            label: <Parameter />, value,
        }
    }

    const [op, setOp] = useState(() => ({
        active: true,
        items: [createItem(), ...buttons],
    }))

    const handleSubmit = async ({ value: { type, onSubmit, update } }) => {
        op.active = false;
        if (type == 'item') update(true);
        if (type == 'button') {
            const res = op.items.slice(0, -numButtons -1).map(el => el.value.txt);
            const setActive = (v) => { op.active = v };
            await onSubmit(res, setActive);
        };
        setOp({ ...op });
    }

    return <>
        <MenuSimple._
            {...{ ...props, ...op }}
            onSubmit={handleSubmit}
        />
    </>
}

export const _ = Menu;