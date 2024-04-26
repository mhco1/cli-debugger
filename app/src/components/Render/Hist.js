import React, { } from 'react';
import { } from 'ink';
import { } from '@inkjs/ui';
import * as types from '~components/Render/Types/Hist';


export default (props) => {
    // const _types = types;
    const Data = types[props.data.type];

    return <>
        <Data {...props} />
    </>
}