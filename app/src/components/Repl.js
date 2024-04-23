import React, { } from 'react';
import { } from 'ink';
import { } from '@inkjs/ui';
import { event } from '~events';
import { toPromise, } from '~utils'
import { Render } from '~components';
import { useContext } from '~hooks';

export default ({ }) => {
    const [context, update, hist] = useContext();

    const handleSubmit = async (script) => {
        const run = toPromise((...args) => event.emit('context_run', ...args));
        const data = await run(script);
        hist.add(Render.Hist, { script, data, name: context.name });
        return data.type
    }

    return <>
        <Render.Render onSubmit={handleSubmit} />
    </>
}