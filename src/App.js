import React, { useState } from 'react';
import { Box, Text } from 'ink';
import { Test, Start, Repl, Menu } from '/components';

export default ({ }) => {
    return <>
        <Box flexDirection="column">
            <Start._ />
            <Repl._ />
        </Box>
    </>
}
