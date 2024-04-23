import React, { } from 'react';
import { Box } from 'ink';
import { Start, Repl } from '~components';

export default ({ }) => {
    // const Start1 = Start;
    // const Test = ()=>{};

    return <>
        <Box flexDirection="column">
            <Start />
            <Repl />
        </Box>
    </>
}
