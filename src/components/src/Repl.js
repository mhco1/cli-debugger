import React, { } from 'react';
import { Box } from 'ink';
import { } from '@inkjs/ui';
import { event } from '/events';
import { toPromise } from '/utils'
import { Input, RenderComp, Arrow } from '/components';
import { useHistory, useContext } from '/hooks';

export const _ = ({ }) => {
    const myContext = useContext._();
    const [context, setContext] = myContext;
    const [value, hist, handleHist] = useHistory._(myContext, RenderComp.Hist, 'script');

    const handleSubmit = async (script) => {
        const run = toPromise._((fn) => event.emit('context_run', script, fn));
        const data = await run();
        handleHist.add({ script, data, name: context.name });
    }

    return <>
        <Box flexDirection='column'>
            {...hist.comp}
            <RenderComp.Input handles={[handleSubmit, handleHist]} value={value} />
        </Box>
    </>
}