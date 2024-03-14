import React, { } from 'react';
import { Box, } from 'ink';
import { } from '@inkjs/ui';
import { Text } from '/components'
import { codes } from '/data';


export const _ = ({ name }) => {
    const txt = `${name} ${codes.arrow.rigth}`

    return <>
        <Box marginRight={1}>
            <Text._ p1>{txt}</Text._>
        </Box>
    </>
}