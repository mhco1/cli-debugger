import React, { } from 'react';
import { Box, Text } from 'ink';
import { } from '@inkjs/ui';
import { Arrow } from '/components'


export const _ = ({ script, data, name }) => {
    return <>
        <Box>
            <Arrow._ name={name} />
            <Text>{script}</Text>
        </Box>
        <Text>{data}</Text>
    </>
}