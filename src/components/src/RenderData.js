import React, { } from 'react';
import { Box, Text } from 'ink';


export const _ =  ({ data }) => {

    const types = {
        value: () => <Text color="#ffff00">{data.value}</Text>,
        error: () => <Text color="#ff0000">{data.value}</Text>,
    }

    const Data = types[data.type];

    return <>
        <Data />
    </>
}