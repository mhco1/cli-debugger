import React from 'react';
import { useState, useEffect } from 'react';
import { Box, Text, useInput, useApp } from 'ink';
import TextInput from 'ink-text-input';
import uuid from '~/utils/uuid.js';
import toPromise from '~/utils/toPromise.js';
import { event } from '~/events/index.js';
import { context } from '~/data.js';
import Prompt from '~/components/repl_prompt.js';

export default ({ setHistory }) => {
    const { exit } = useApp();
    const [script, setScript] = useState('');
    const [name, setName] = useState('');

    const onSubmit = (name, script) => async () => {
        const run = toPromise((fn) => event.emit('context_run', script, fn));
        const data = await run();
        setHistory(prev => [
            ...prev,
            <Box key={uuid()}>
                <Prompt name={name} />
                <Text>{script}</Text>
            </Box>,
            <Box key={uuid()}>
                <Prompt name={name} />
                <Text>{JSON.stringify(data)}</Text>
            </Box>
        ]);
        setScript('');
    }

    // useInput((input, key) => {
    //     if (input == 'c' && key.ctrl) {
    //         event.emit('exit');
    //         exit();
    //     }
    // })

    useEffect(() => {
        event.on('context_select', () => setName(context.now));
    }, [])

    return <>
        <Box>
            <Prompt name={name} />
            <TextInput value={script} onChange={setScript} onSubmit={onSubmit(name, script)} />
        </Box>
    </>
}