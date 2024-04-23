import React, { } from 'react';
import { Box, } from 'ink';
import { } from '@inkjs/ui';
import { Text } from '~components'
import { codes } from '~data.js';

export default ({ name }) => {
    const txt = `${name} ${codes.arrow.rigth}`

    return <>
        <Box marginRight={1}>
            <Text.p1>{txt}</Text.p1>
        </Box>
    </>
}