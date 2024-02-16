import React, { useRef, useState, isValidElement, useEffect } from 'react';
import { EventEmitter } from 'events';
import { codes } from '/data';
import { Text, useInput } from 'ink';
import { Select } from '@inkjs/ui';
import { uuid } from '/utils'

const processItems = (arr, label = '$', prev = { values: {}, items: [], path: [] }) => {

    const convert = (el, idx, id) => {
        const singleConvert = (el) => {
            if (['string', 'number'].includes(typeof el)) return [
                { label: el, value: id },
                { value: [idx, el] }
            ];
            if (isValidElement(el)) return [
                { label: el, value: id },
                { value: [idx] }
            ];

            return []
        };

        {
            const res = singleConvert(el);
            if (res.length > 0) return res;
        }

        if (Array.isArray(el)) {
            const res = singleConvert(el[0]);
            if (typeof el[1] !== 'undefined') {
                res[1].value = [idx, el[1]];
            }
            return res;
        }

        if (typeof el === 'object') {
            const res = singleConvert(el.label);
            if (res.length < 1) throw Error(`Invalid value to el.label\nType is: ${typeof el.label}`);
            return [
                res[0],
                { ...el, value: [idx, (el.value ?? res[1].value[1])] }
            ]
        }

        if (typeof el === 'function') {
            let res = el();
            res = singleConvert(res);
            if (res.length < 1) throw Error(`Invalid value to el()\nType is: ${typeof res}`);
            return res
        }

        throw Error(`Invalid value to el\nType is: ${typeof el}`);
    }

    const res = {
        ...prev,
        values: { ...prev.values },
        items: [...prev.items, []],
        path: [...prev.path, label],
    };

    arr.forEach((el, i) => {
        const id = uuid._();
        const [item, value] = convert(el, i, id);

        res.values[id] = value;
        res.items.slice(-1)[0].push(item)
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
    label: codes.arrow.left.repeat(2),
    _: {
        back: true,
    },
}

export const _ = ({ onSubmit, items, event }) => {
    let handleToExecute;
    const [disable, setDisable] = useState();
    const [op, setOp] = useState(processItems(items));

    const handleItem = (item) => {
        const has = (prop) => Object.hasOwn(item, prop);

        if (has('_')) {
            if (item._.back) return setOp(removeItems(op));
        }
        if (has('submenu')) return setOp(processItems([back, ...item.submenu], item.label, op));
        if (has('execute')) return setOp(processItems([back, ...item.execute()], item.label, op));
        return onSubmit(item.value);
    }

    useInput((input, key) => {
        if (key.return) {
            handleToExecute = handleItem;
            return
        }
    })

    useEffect(() => {
        event.on('menu_active', (active) => {
            setDisable(active ? undefined : true);
        })
    }, [])

    return <>
        <Text>{op.path.join(' \u276f ')}</Text>
        <Select
            isDisabled={disable}
            options={op.items.slice(-1)[0]}
            onChange={(id) => {
                const item = op.values[id];
                if (typeof handleToExecute == 'undefined') return
                handleToExecute(item);
            }}
        />
    </>
}
