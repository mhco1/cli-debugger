import React, { useEffect, useState } from 'react';
import { Box, Text, useInput } from 'ink';
import { } from '@inkjs/ui';
import { stringInsert, stringRemove, stringSplit, stringReverse } from '/utils';

const armInit = {
    pos: 0,
    txt: '',
};

const stringGetPosToNextSymbol = (str, pos = 0, reverse = false) => {
    const arrPos = str
        .split(/[A-z0-9]/g)
        .map(el => el.length > 0 ? [...el.split(''), ''] : [''])
        .flat()
        .map((el, id) => el.length > 0 && id)
        .filter(el => el !== false);
    const nextPos = arrPos[reverse ? 'findLast' : 'find'](
        el => reverse ? el < pos : el > pos
    );
    return nextPos || -1;
}

const txtSplit = (txt, pos) => {
    const [txt1, _txt2] = stringSplit._(txt, pos);
    const [k, txt2] = stringSplit._(_txt2, 1);
    return [txt1, txt2, k]
}

const isHistoryEnabled = (hist) => {
    return (
        typeof hist === 'object' &&
        !Array.isArray(hist) &&
        Object.keys(hist).filter(el => ['up', 'down'].includes(el)).length > 0
    )
}

const Cursor = ({ k }) => <Text inverse={true}>{k.length == 0 ? ' ' : k}</Text>;

export const _ = ({ onSubmit, value, onHistory }) => {
    const [arm, setArm] = useState(armInit);
    const { txt, pos } = arm;
    const [txt1, txt2, k] = txtSplit(txt, pos);
    const historyEnabled = isHistoryEnabled(onHistory);

    useInput(async (input, key) => {
        const exe = {
            ctrl() {
                if (input === 'u') {
                    setArm({ ...armInit });
                    return 'end'
                }
            },
            upArrow() {
                if (historyEnabled) onHistory.up(arm.txt);
                return 'end'
            },
            downArrow() {
                if (historyEnabled) onHistory.down(arm.txt);
                return 'end'
            },
            leftArrow() {
                if (pos > 0) {
                    let p = pos - 1;

                    if (key.ctrl) {
                        p = stringGetPosToNextSymbol(txt, pos, true);
                        if (p == -1) {
                            p = 0;
                        }
                    }

                    arm.pos = p;
                    setArm({ ...arm });
                }

                return 'end'
            },
            rightArrow() {
                if (pos < txt.length) {
                    let p = pos + 1;

                    if (key.ctrl) {
                        p = stringGetPosToNextSymbol(txt, pos + 1);
                        if (p == -1) {
                            p = txt.length;
                        }
                    }

                    arm.pos = p;
                    setArm({ ...arm });
                }

                return 'end'
            },
            async return() {
                await onSubmit(txt);
                setArm({ ...armInit });
                return 'end'
            },
            delete() {
                if (pos > 0) {
                    arm.txt = stringRemove._(txt, pos);
                    arm.pos = pos - 1;
                    setArm({ ...arm });
                }
                return 'end'
            },
        };

        for (const cmd of Object.keys(exe)) if (key[cmd]) if (await exe[cmd]() === 'end') return;

        arm.txt = stringInsert._(txt, input, pos);
        arm.pos = pos + input.length
        setArm({ ...arm });
    })

    useEffect(() => {
        arm.pos = value.length;
        arm.txt = value;
        setArm({ ...arm });
    }, [value]);

    return <>
        <Box>
            <Text>{txt1}</Text>
            <Cursor k={k} />
            <Text>{txt2}</Text>
        </Box>
    </>
}