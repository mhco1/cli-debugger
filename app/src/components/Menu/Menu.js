import React, { isValidElement, useMemo, useState } from 'react';
import { useInput, Box } from 'ink';
import { } from '@inkjs/ui';
import { Text } from '~components';
import { uuid, componentExternalUpdate } from '~utils';
import { codes } from '~data.js';

const convert = (el, idx, selectDef) => {

    const singleConvert = (el) => {
        const id = uuid();
        const [{ update }, useSelect] = componentExternalUpdate();
        const Arrow = ({ }) => {
            const isSelect = useSelect(selectDef);
            return <Text> {isSelect ? codes.arrow.rigth : ' '} </Text>
        };

        if (['string', 'number'].includes(typeof el)) {
            const Comp = () => <Box>
                <Arrow />
                <Text>{el}</Text>
            </Box>;

            return [
                { value: el, idx, id, update },
                <Comp key={id} />
            ]
        };
        if (isValidElement(el)) {
            const Comp = () => <Box>
                <Arrow />
                {el}
            </Box>;

            return [
                { value: null, idx, id, update, isElement: true, },
                <Comp key={id} />
            ];
        }

        return -1
    };

    {
        const res = singleConvert(el);
        if (res !== -1) return res;
    }

    if (Array.isArray(el)) {
        const res = singleConvert(el[0]);
        if (res === -1) throw Error(`Invalid value to el[0]\nType is: ${typeof el.value}`);
        const [resObj, resComp] = res;

        if (typeof el[1] !== 'undefined') {
            resObj.value = el[1];
        }

        return [resObj, resComp];
    }

    if (typeof el === 'object') {
        const res = singleConvert(el.label || el.value);
        if (res === -1) throw Error(`Invalid value to el[0]\nType is: ${typeof el.value}`);
        const [resObj, resComp] = res;

        return [
            { ...resObj, ...el },
            resComp
        ]
    }

    if (typeof el === 'function') {
        let res = el();
        res = singleConvert(res);
        if (res === -1) throw Error(`Invalid value to el()\nType is: ${typeof el.value}`);
        const [resObj, resComp] = res;

        return [resObj, resComp]
    }

    throw Error(`Invalid value to el\nType is: ${typeof el}`);
}

const processItems = (arr, select) => {
    const resItems = [];
    const resComps = [];

    arr.forEach((el, idx) => {
        const [item, Comp] = convert(el, idx, idx == select);
        resItems.push(item);
        resComps.push(Comp);
    })

    return [resItems, resComps]
}

export default ({ onSubmit = async () => { }, items, active, row }) => {
    const [select, setSelect] = useState(0);
    const [itemsObj, itemsComp] = useMemo(
        () => processItems(items, select),
        [items]
    );

    useInput(async (input, key) => {
        const selectNext = (next) => {
            itemsObj[select].update(false);
            itemsObj[next].update(true);
            setSelect(next);
        }

        if (typeof active !== 'undefined' && !active) return

        if (key.return) {
            return await onSubmit(itemsObj[select]);
        }
        if (select > 0 && (row ? key.leftArrow : key.upArrow)) {
            return selectNext(select - 1);
        };
        if (select < itemsObj.length - 1 && (row ? key.rightArrow : key.downArrow)) {
            return selectNext(select + 1);
        };
    })
    const lastIdx = itemsObj.length - 1;
    if (lastIdx < select) {
        setSelect(lastIdx);
    }

    return <>
        <Box flexDirection={row ? 'row' : 'column'}>
            {itemsComp}
        </Box>
    </>
}