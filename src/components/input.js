import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';

const insertString = (t, tt, i = 0) => t.slice(0, i) + tt + t.slice(i);
const removeString = (t, i = 0) => t.slice(0, i - 1) + t.slice(i);
const splitString = (t, i = 0) => [t.slice(0, i), t.slice(i)];

const Cursor = ({ k }) => {

    return <>
        <Text inverse={typeof type === 'undefined'}>{k == '' ? ' ' : k}</Text>
    </>
}

export default ({ onSubmit, history }) => {
    const [s, setS] = useState({
        txt: '',
        pos: 0,
        hist: Array.isArray(history) ? ['', history] : [''],
        histPos: 0,
    });

    const [txt1, _txt2] = splitString(s.txt, s.pos);
    const [k, txt2] = splitString(_txt2, 1);

    useInput((input, key) => {
        const exe = {
            ctrl() {
                if (input === 'u') {
                    setS(s => ({
                        ...s,
                        txt: '',
                        hist: ['', ...s.hist.slice(1)],
                        pos: 0,
                    }))

                    return 'end'
                }
            },
            upArrow() {
                if (s.histPos < s.hist.length - 1) setS(s => ({
                    ...s,
                    txt: s.hist[s.histPos + 1],
                    histPos: s.histPos + 1
                }))
                return 'end'
            },
            downArrow() {
                if (s.histPos > 0) setS(s => ({
                    ...s,
                    txt: s.hist[s.histPos - 1],
                    histPos: s.histPos - 1
                }))
                return 'end'
            },
            leftArrow() {
                if (s.pos > 0) setS(s => ({
                    ...s,
                    pos: s.pos - 1
                }))
                return 'end'
            },
            rightArrow() {
                if (s.pos < s.txt.length) setS(s => ({
                    ...s,
                    pos: s.pos + 1
                }))
                return 'end'
            },
            return() {
                onSubmit(s.txt);
                setS(s => ({
                    ...s,
                    txt: '',
                    pos: 0,
                    hist: ['', ...s.hist]
                }))
                return 'end'
            },
            delete() {
                if (s.pos > 0) setS(s => ({
                    ...s,
                    txt: removeString(s.txt, s.pos),
                    pos: s.pos - 1,
                }))
                return 'end'
            },
        }

        for (const cmd of Object.keys(exe)) if (key[cmd]) if (exe[cmd]() === 'end') return

        setS(s => {
            let txt = insertString(s.txt, input, s.pos);
            return {
                ...s,
                txt: txt,
                pos: s.pos + input.length,
                hist: [txt, ...s.hist.slice(1)],
                histPos: 0
            }
        });
    })

    return <>
        <Text>{txt1}<Cursor k={k} />{txt2}</Text>
    </>
}