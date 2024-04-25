import React, { } from 'react';
import { } from 'ink';
import { } from '@inkjs/ui';
import * as types from '~components/Render/Types/Input';

export default (props) => {
    const dataName = props.type[0].toUpperCase() + props.type.slice(1);
    const Data = types[dataName];

    return <>
        <Data {...props} />
    </>
}