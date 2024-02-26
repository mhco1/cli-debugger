import React, { useState } from 'react';
import { } from 'ink';
import { } from '@inkjs/ui';
import { uuid } from '/utils';

const armInit = {
    pos: -1,
    value: '',
};

export const _ = ([context, setContext], Comp, valueKey = 'value') => {
    const [arm, setArm] = useState(armInit);
    const { hist, name } = context;
    const { pos, value } = arm;

    const getValue = () => pos > -1 ? hist.list[pos][valueKey] : value;

    const getHist = () => {
        const newHist = [...hist.list].reverse();
        newHist.comp = hist.comp;
        return newHist;
    }

    const handle = {
        up(value) {
            if (pos + 1 < hist.list.length) {
                if (pos === -1) {
                    arm.value = value;
                }
                arm.pos = pos + 1;
                setArm({ ...arm });
            }
        },
        down() {
            if (pos - 1 > -2) {
                arm.pos = pos - 1;
                setArm({ ...arm });
            }
        },
        add(op = {}) {
            const id = uuid._();
            context.hist.list = [{ ...op, id }, ...hist.list];
            context.hist.comp = [...hist.comp, <Comp key={id} {...op} />];
            arm.value = '';
            arm.pos = -1;
            setContext({ ...context });
            setArm({ ...arm });
        },
        getLast(){
            return context.hist.list.slice(-1)[0] || { name };
        }
    }

    return [getValue(), getHist(), handle];
}