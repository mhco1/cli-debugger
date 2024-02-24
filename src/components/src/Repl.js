import React, { } from 'react';
import { Box } from 'ink';
import { } from '@inkjs/ui';
import { event } from '/events';
import { toPromise } from '/utils'
import { Input, Hist, Arrow } from '/components';
import { useHistory, useContext } from '/hooks';

export const _ = ({ }) => {
    const myContext = useContext._();
    const [context, setContext] = myContext;
    const [value, hist, handleHist] = useHistory._(myContext, Hist._, 'script');

    const handleSubmit = async (script) => {
        const run = toPromise._((fn) => event.emit('context_run', script, fn));
        const data = (await run()).value;
        handleHist.add({ script, data, name: context.name });
    }

    return <>
        <Box flexDirection='column'>
            {...hist.comp}
            <Box>
                <Arrow._ name={context.name} />
                <Input._ onSubmit={handleSubmit} onHistory={handleHist} value={value} />
            </Box>
        </Box>
    </>
}