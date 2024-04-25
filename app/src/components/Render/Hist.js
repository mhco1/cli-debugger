import React, { } from 'react';
import { } from 'ink';
import { } from '@inkjs/ui';
import * as types from '~components/Render/Types/Hist';


export default (props) => {
    const dataName = props.data.type[0].toUpperCase() + props.data.type.slice(1);
    const Data = types[dataName];

    return <>
        <Data {...props} />
    </>
}