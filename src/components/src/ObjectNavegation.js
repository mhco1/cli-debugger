import React, { useState } from 'react';
import { Text, useInput, Box } from 'ink';

const prototypes = [
    { name: 'aaa', uuid: '1' },
    { name: 'bbb', uuid: '2' },
    { name: 'ccc', uuid: '3' },
]

export const _ = ({ }) => {
    const [select, setSelect] = useState(0);

    useInput((input, key) => {
        if (select > 0 && key.upArrow) setSelect(select - 1);
        if (select < prototypes.length - 1 && key.downArrow) setSelect(select + 1);
    })

    return <>
        <Box flexDirection="column">
            {prototypes.map((el, id) => <Text inverse={id == select} key={el.uuid}>{el.name}</Text>)}
        </Box>
    </>
}