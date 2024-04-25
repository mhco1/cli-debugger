import React, {  } from 'react';
import { Box } from 'ink';
import {  } from '@inkjs/ui';
import { Arrow, Text } from '~components';


export default ({ name, script }) => <>
    <Box>
        <Arrow name={name} />
        <Text>{script}</Text>
    </Box>
</>