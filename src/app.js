import React, { } from 'react';
import { Box } from 'ink';
import { Start, Repl } from '/components';

export default ({ }) => {

    return <>
        <Box flexDirection="column">
            <Start._ />
            <Repl._ />
        </Box>
    </>
}
