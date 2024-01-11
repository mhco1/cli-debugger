import React from 'react';
import { Box, Text } from 'ink';

export default ({ name }) => <>
    <Box marginRight={1}>
        <Text color='#0000ff'>{`${name} >`}</Text>
    </Box>
</>