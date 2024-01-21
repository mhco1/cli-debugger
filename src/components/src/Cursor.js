import React, { } from 'react';
import { Text } from 'ink';


export const _ = ({ k }) => {

    return <>
        <Text inverse={true}>{k.length == 0 ? ' ' : k}</Text>
        {/* <Text inverse={true}>{'>'}</Text> */}
    </>
}