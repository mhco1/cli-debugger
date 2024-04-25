import React, { } from 'react';
import { } from 'ink';
import { } from '@inkjs/ui';
import { componentExternalUpdate } from '~utils';
import * as types from '~components/Render/Types/Hist';


export default (props) => {
    const useResponse = componentExternalUpdate('render_object')[1];
    const data = useResponse(null);
    const Data = data ? types[data.type] : () => <></>;

    return <>
        <Data {...{ ...props, data }} />
    </>
}