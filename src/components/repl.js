import React from 'react';
import { useState, useEffect } from 'react';
import { event } from '~/events/index.js';
import Repl from '~/components/repl_input.js';

export default () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        event.emit('context_create', 'context');
        event.emit('context_select', 'context');
    }, [])

    return <>
        {history}
        <Repl setHistory={setHistory} />
    </>
}