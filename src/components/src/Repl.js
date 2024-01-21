import React from 'react';
import { useState, useEffect } from 'react';
import { Box } from 'ink';
import * as data from '/data';
import { event } from '/events';
import { uuid, toPromise } from '/utils';
import { Prompt } from '/components';

export const _ = ({ }) => {
    const [context, setContext] = useState();

    const History = ({ script, data }) => <>
        <Box flexDirection="column">
            <Prompt._.Log name={context.name}>
                {script}
            </Prompt._.Log>
            <Prompt._.Log name={context.name}>
                {data}
            </Prompt._.Log>
        </Box>
    </>

    const getHistory = () => [context.history[0], ...context.history.slice(1).map(el => el.script).reverse()];

    const setHistory = (txt) => {
        setContext({
            ...context,
            history: [txt, ...context.history.slice(1)],
        })
    }

    const onSubmit = async (script) => {
        const run = toPromise._((fn) => event.emit('context_run', script, fn));
        const data = await run();

        setContext({
            ...context,
            history: [
                '',
                ...context.history.slice(1),
                { script, data, uuid: uuid._() },
            ]
        })
    }

    useEffect(() => {
        event.emit('context_create', 'context');
        event.on('context_select', () => {
            const { c, now } = data.context;

            if (context ?? false) {
                const { name, history } = context;
                c[name].history = history;
            }

            setContext(c[now]);
        });
        event.emit('context_select', 'context');
    }, [])

    if (typeof context == 'undefined') return <></>

    return <>
        {context.history.slice(1).map(el => <History key={el.uuid} {...el} />)}
        <Prompt._.Input name={context.name} onSubmit={onSubmit} history={getHistory()} setHistory={setHistory} />
    </>
}