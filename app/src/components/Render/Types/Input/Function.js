import React, { } from 'react';
import { Box } from 'ink';
import { } from '@inkjs/ui';
import { event } from '~events';
import { Menu, Text } from '~components';
import { useContext } from '~hooks';
import { toPromise, componentExternalUpdate } from '~utils';

export default ({ onSubmit, type, setType }) => {
    const [context, update, hist] = useContext();
    const { script, data } = hist.getValue(-1);
    const response = componentExternalUpdate('render_function')[0];
    const Anonymous = () => <Text.gray>anonymous</Text.gray>;
    const Name = () => <Text>{data.name || <>[<Anonymous />]</>}</Text>;
    const buttons = [{
        label: 'Run',
        value: {
            onSubmit: async (parameters) => {
                const callFunction = toPromise((...args) => event.emit('context_call_function', ...args));
                const _data = await callFunction(data.id, parameters);
                response.update(_data);
                response.disconnect();
                setType('value');
            }
        }
    }];

    return <>
        <Box flexDirection='row'>
            <Text><Name />( </Text>
            <Menu.List row buttons={buttons} />
            <Text>)</Text>
        </Box>
    </>
}