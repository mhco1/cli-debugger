import React, { useState } from 'react';
import { Box, Text } from 'ink';
// import Start from '~/components/start.js';
// import Repl from '~/components/repl.js';
import Input from '~/src/components/input.js';

export default ({ }) => {
    const [res, setRes] = useState('');
    const [value, setValue] = useState('')

    return <>
        <Box flexDirection="column">
            <Input onSubmit={input => setRes(input)} />
            {/* <TextInput value={value} onChange={(v) => {
                ksetValue(v)
            }} onSubmit={(v) => setRes(v)} /> */}
            <Text>{res}</Text>
        </Box>
    </>
}
