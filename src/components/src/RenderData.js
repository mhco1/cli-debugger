import React, { } from 'react';
import { Box, Text } from 'ink';


export const _ =  ({ data }) => {

    const type = {
        value: () => <Text color="#ffff00">{data.value}</Text>,
        error: () => <Text color="#ff0000">{data.value}</Text>,
    }

    const Data = type[data.type];

    return <>
        <Data />
    </>
}