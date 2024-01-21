import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
// import { Cursor } from '/components';
import { stringInsert, stringRemove, stringSplit, stringReverse } from '/utils';

// { script, data, uuid: uuid._() }

let storage;

const Cursor = ({ k }) => <Text inverse={true}>{k.length == 0 ? ' ' : k}</Text>

export const _ = ({ name, onSubmit, history, setHistory }) => {
    const [pos, setPos] = useState({ t: 0, h: 0 });

    const txt = history[0];
    const [txt1, _txt2] = stringSplit._(txt, pos.t);
    const [k, txt2] = stringSplit._(_txt2, 1);

    const setPos2 = (t) => (h) => {
        const analyse = (v, pre) =>
            typeof v !== 'undefined' ?
                Array.isArray(v) ?
                    v[0] === '+' ?
                        pre + v[1] :
                        v[0] === '-' ?
                            pre - v[1] :
                            undefined :
                    v :
                undefined;
        t = analyse(t, pos.t);
        h = analyse(h, pos.h);
        if (
            typeof t !== 'undefined' ||
            typeof h !== 'undefined'
        ) {
            setPos({
                t: t ?? pos.t,
                h: h ?? pos.h,
            })
        }
    }

    useInput(async (input, key) => {
        const exe = {
            ctrl() {
                if (input === 'u') {
                    setHistory('');
                    setPos2(0)();
                    return 'end'
                }
            },
            upArrow() {
                if (pos.h === 0) {
                    storage = txt;
                }
                if (pos.h < history.length - 1) {
                    const _txt = history[pos.h + 1];
                    setHistory(_txt);
                    setPos2(_txt.length)(['+', 1]);
                };
                return 'end'
            },
            downArrow() {
                if (pos.h > 0) {
                    let _txt;
                    if (pos.h === 1) {
                        _txt = storage;
                    } else {
                        _txt = history[pos.h - 1];
                    }
                    setHistory(_txt);
                    setPos2(_txt.length)(['-', 1]);
                };
                return 'end'
            },
            leftArrow() {
                if (pos.t > 0) {
                    let p = pos.t - 1;

                    if (key.ctrl) {
                        p = stringReverse._(txt).indexOf(' ', txt.length - pos.t);
                        if (p == -1) {
                            p = 0;
                        } else {
                            p = txt.length - p - 1;
                        }
                    }

                    setPos2(p)();
                }

                return 'end'
            },
            rightArrow() {
                if (pos.t < txt.length) {
                    let p = pos.t + 1;

                    if (key.ctrl) {
                        p = txt.indexOf(' ', pos.t + 1);
                        if (p == -1) {
                            p = txt.length;
                        }
                    }

                    setPos2(p)();
                }

                return 'end'
            },
            async return() {
                await onSubmit(txt);
                setPos2(0)(0);
                return 'end'
            },
            delete() {
                if (pos.t > 0) {
                    setHistory(stringRemove._(txt, pos.t));
                    setPos2(['-', 1])();
                }
                return 'end'
            },
        }

        for (const cmd of Object.keys(exe)) if (key[cmd]) if (await exe[cmd]() === 'end') return;

        setHistory(stringInsert._(txt, input, pos.t));
        setPos2(['+', input.length])();
    })

    return <>
        <Box>
            <Text>{txt1}</Text>
            <Cursor k={k} />
            <Text>{txt2}</Text>
        </Box>
    </>
}