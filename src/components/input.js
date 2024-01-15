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
        hist: Array.isArray(history) ? history : [],
        histPos: 0,
    });

    const [txt1, _txt2] = splitString(s.txt, s.pos);
    const [k, txt2] = splitString(_txt2, 1);

    useInput((input, key) => {

        if (key.upArrow) return (s.histPos < s.hist.length - 1 && setS(s =>
            ({ ...s, txt: s.hist[s.histPos + 1], histPos: s.histPos + 1 })
        ));

        if (key.downArrow) return (s.histPos > 0 && setS(s =>
            ({ ...s, txt: [s.txt, ...s.hist][s.histPos - 1], histPos: s.histPos - 1 })
        ));

        if (key.leftArrow) return (s.pos > 0 && setS(s =>
            ({ ...s, pos: s.pos - 1 }))
        );

        if (key.rightArrow) return (s.pos < s.txt.length && setS((s) =>
            ({ ...s, pos: s.pos + 1 }))
        );

        if (key.return) {
            onSubmit(s.txt); return setS(s =>
                ({ ...s, txt: '', pos: 0, hist: [s.txt, ...s.hist] })
            )
        };

        if (key.delete) return (pos > 0 && setS(s => ({
            ...s, txt: removeString(s.txt, s.pos), pos: s.pos - 1,
        })));

        setS(s => ({
            ...s, txt: insertString(s.txt, input, s.pos), pos: s.pos + 1, histPos: 0
        }));
    })

    return <>
        <Text>{txt1}<Cursor k={k} />{txt2}</Text>
    </>
}