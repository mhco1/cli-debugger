import React, { } from 'react';
import { Box } from 'ink';
import { } from '@inkjs/ui';
import { Input, Arrow } from '~components';
import { useContext } from '~hooks';

export default ({ onSubmit, type, setType }) => {
    const [context, update, hist] = useContext();
    const { script, data } = hist.getValue();

    return <>
        <Box>
            <Arrow name={context.name} />
            <Input
                onSubmit={onSubmit}
                onHistory={hist}
                value={script}
            />
        </Box>
    </>
}