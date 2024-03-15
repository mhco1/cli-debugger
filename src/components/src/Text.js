import React, { } from 'react';
import { Text } from 'ink';
import { } from '@inkjs/ui';
import { colors } from '/data';

const Text2 = (props) => <Text {...props} />

colors.forEach(([key, fn]) => {
    Text2[key] = ({ children }) =>
        <Text>
            { fn(children) }
        </Text>
})

export const _ = Text2