import React, { } from 'react';
import { } from 'ink';
import { } from '@inkjs/ui';
import { event } from '/events';
import { toPromise, } from '/utils'
import { Render } from '/components';
import { useContext } from '/hooks';

export const _ = ({ }) => {
    const [context, update, hist] = useContext._();

    const handleSubmit = async (script) => {
        const run = toPromise._((fn) => event.emit('context_run', script, fn));
        const data = await run();
        hist.add(Render.Hist, { script, data, name: context.name });
        return data.type
    }

    return <>
        <Render._ onSubmit={handleSubmit} />
    </>
}