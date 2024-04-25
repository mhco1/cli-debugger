import React, { } from 'react';
import { } from 'ink';
import { } from '@inkjs/ui';
import { componentExternalUpdate } from '~utils';
import * as types from '~components/Render/Types/Hist';


export default (props) => {
    const useResponse = componentExternalUpdate('render_function')[1];
    const data = useResponse(null);
    const dataName = data && data.type[0].toUpperCase() + data.type.slice(1);
    const Data = data ? types[dataName] : () => <></>;

    return <>
        <Data {...{ ...props, data }} />
    </>
}