import React, { useMemo, useState } from 'react';
import { } from 'ink';
import { TextInput } from '@inkjs/ui';
import { Menu, Text } from '~components';
import { componentExternalUpdate } from '~utils';

export default (props) => {
    const buttons = (props.buttons || []).map(el => {
        el.value.type = 'button';
        return el;
    });
    const numButtons = buttons.length;

    const createItem = (iniActive = false) => {
        const value = { type: 'item', update: null, isUndefined: true, txt: '' };

        const Parameter = () => {
            const [activeControl, useActive] = useMemo(() => {
                const res = componentExternalUpdate();
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
                            <Text>::</Text>
                            <TextInput
                                placeholder='type...'
                                onSubmit={handleSubmit}
                            />
                        </> :
                        value.txt.length < 1 ?
                            <Text.gray>undefined</Text.gray> :
                            <Text >{value.txt}</Text>
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
        <Menu.Menu
            {...{ ...props, ...op }}
            onSubmit={handleSubmit}
        />
    </>
}