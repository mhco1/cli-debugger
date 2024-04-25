import React, { } from 'react';
import { } from 'ink';
import { } from '@inkjs/ui';
import * as types from '~components/Render/Types/Input';

export default (props) => {
    const Data = types[props.type];

    return <>
        <Data {...props} />
    </>
}