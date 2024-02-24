import React, { } from 'react';
import { Box, Text } from 'ink';
import { } from '@inkjs/ui';
import { codes } from '/data';


export const _ = ({ name }) => <>
    <Box marginRight={1}>
        <Text color='#0000ff'>{`${name} ${codes.arrow.rigth}`}</Text>
    </Box>
</>