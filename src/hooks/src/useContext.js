import React, { useState, useEffect } from 'react';
import { } from 'ink';
import { } from '@inkjs/ui';
import * as data from '/data';
import { event } from '/events';

const contextInit = {
    name:'',
    hist: {
        list: [],
        comp: [],
    },
};

export const _ = () => {
    const [context, setContext] = useState(contextInit);

    useEffect(() => {
        event.emit('context_create', 'context', contextInit);

        event.on('context_select', () => {
            const { c, now } = data.context;
            setContext(c[now]);
        });

        event.emit('context_select', 'context');
    }, [])

    return [context, setContext];
}