import React, { useState } from 'react';
import { Text } from 'ink';
import { Select } from '@inkjs/ui';
import { uuid } from '/utils'

const processItems = (arr, label = '$', prev = { values: {}, items: [], path: [] }) => {
    const res = {
        ...prev,
        values: { ...prev.values },
        items: [...prev.items, []],
        path: [...prev.path, label],
    };
    arr.forEach(el => {
        const id = uuid._();
        res.values[id] = { ...el };
        res.items.slice(-1)[0].push({
            label: el.label,
            value: id,
        })
    })

    return res
}

const removeItems = (prev) => {
    const res = {
        ...prev,
        items: prev.items.slice(0, -1),
        path: prev.path.slice(0, -1),
    }
    prev.items.slice(-1)[0].forEach(el => {
        const { value } = el;
        delete res.values[value];
    })

    return res;
}

const back = {
    label: '\u276e\u276e',
    value: 'back'
}

export const _ = ({ onSubmit, items }) => {
    const [op, setOp] = useState(processItems(items));

    const getValue = (fn) => (id) => fn(op.values[id])

    return <>
        <Text>{op.path.join(' \u276f ')}</Text>
        <Select
            options={op.items.slice(-1)[0]}
            onChange={getValue(({ label, value }) => {
                if (label == back.label) return setOp(removeItems(op))
                if ( typeof value == 'object' && !Array.isArray(value)){
                    if(value.submenu) return setOp(processItems([back, ...value.submenu], label, op))
                    if(value.generate) return setOp(processItems([back, ...value.generate()], label, op))
                    return
                };
                onSubmit(value);
            })}
        />
    </>
}
