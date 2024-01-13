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

export default ({ onSubmit }) => {
    const [hist, setHist] = useState([]);
    const [s, setS] = useState({
        txt: '',
        pos: 0,
    });

    const [txt1, _txt2] = splitString(s.txt, s.pos);
    const [k, txt2] = splitString(_txt2, 1);

    useInput((input, key) => {
        if (key.upArrow) return
        if (key.downArrow) return
        if (key.leftArrow) return (s.pos > 0 && setS(prev => ({ ...prev, pos: prev.pos - 1 })));
        if (key.rightArrow) return (s.pos < s.txt.length && setS(prev => ({ ...prev, pos: prev.pos + 1 })));
        if (key.return) return onSubmit(s.txt);
        if (key.delete) return (s.pos > 0 && setS(prev => ({
            ...prev,
            txt: removeString(prev.txt, prev.pos),
            pos: prev.pos - 1,
        })));

        setS(prev => ({
            ...prev,
            txt: insertString(prev.txt, input, prev.pos),
            pos: prev.pos + 1,
        }));
    })

    return <>
        <Text>{txt1}<Cursor k={k} />{txt2}</Text>
    </>
}