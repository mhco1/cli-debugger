import React, { } from 'react';
import { Text } from 'ink';
import { } from '@inkjs/ui';
import { colors } from '/data';


export const _ = (props) => {

    // const color = colors[type || 'white'];
    const colorFilter = colors.filter(el => props[el[0]]);
    const color = colorFilter.length < 1 ? colors[2][1] : colorFilter[0][1];

    return <>
        <Text>{
            color(props.children)
        }</Text>
    </>
}