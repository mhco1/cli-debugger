import React, { useState } from 'react';
import { Box } from 'ink';
import { } from '@inkjs/ui';
import { event } from '/events';
import { toPromise } from '/utils'
import { RenderComp } from '/components';
import { useHistory, useContext } from '/hooks';

export const _ = ({ }) => {
    const myContext = useContext._();
    const [context, setContext] = myContext;
    const stateTypeRender = useState('default');
    const [value, hist, handleHist] = useHistory._(myContext, RenderComp.Hist._, 'script');

    const handleSubmit = async (script) => {
        const run = toPromise._((fn) => event.emit('context_run', script, fn));
        const data = await run();
        handleHist.add({ script, data, name: context.name });
        return data.type
    }

    return <>
        <Box flexDirection='column'>
            {...hist.comp}
            <RenderComp.Input._
                handles={[handleSubmit, handleHist]}
                value={value}
                context={context}
                stateTypeRender={stateTypeRender}
            />
        </Box>
    </>
}