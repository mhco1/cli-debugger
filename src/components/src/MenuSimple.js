import React, { isValidElement, useEffect, useMemo, useRef, useState } from 'react';
import { useInput, Box } from 'ink';
import { } from '@inkjs/ui';
import { } from '/events';
import { Text } from '/components';
import { uuid, componentExternalUpdate } from '/utils';
import { codes } from '/data';

const convert = (el, idx, selectDef) => {

    const singleConvert = (el) => {
        const id = uuid._();
        const [{ update }, useSelect] = componentExternalUpdate._();
        const Arrow = ({ }) => {
            const isSelect = useSelect(selectDef);
            return <Text._>{isSelect ? codes.arrow.rigth : ' '} </Text._>
        };

        if (['string', 'number'].includes(typeof el)) {
            const Comp = () => <Box>
                <Arrow />
                <Text._>{el}</Text._>
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

export const _ = (props) => {
    const [select, setSelect] = useState(0);
    const [items, itemsComp] = useMemo(() => {
        const lastIdx = props.items.length - 1;
        let _select = select;
        if(lastIdx < select) {
            _select = lastIdx;
            setSelect(lastIdx);
        }
        return processItems(props.items, _select)
    }, [props.items]);
    const onSubmit = props.onSubmit || (() => { });

    useInput((input, key) => {
        const selectNext = (next) => {
            items[select].update(false);
            items[next].update(true);
            setSelect(next);
        }

        if (typeof props.active !== 'undefined' && !props.active) return

        if (key.return) {
            return onSubmit(items[select]);
        }
        if (select > 0 && key.upArrow) {
            return selectNext(select - 1);
        };
        if (select < items.length - 1 && key.downArrow) {
            return selectNext(select + 1);
        };
    })

    return <>
        <Box flexDirection="column">
            {itemsComp}
        </Box>
    </>
}