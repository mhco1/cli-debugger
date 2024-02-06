import React, { useState } from 'react';
import { Box, Text } from 'ink';
import { Test, Start, Repl, Menu } from '/components';

export default ({ }) => {

    // const generate = () => [
    //     {
    //         label: 'aa',
    //         value: 'ok'
    //     },
    //     {
    //         label: 'outro aa',
    //         value: 'ok2'
    //     }
    // ]

    // const [item, setItem] = useState([]);

    // const onMenuSubmit = (select) => setItem(select);

    return <>
        <Box flexDirection="column">
            <Start._ />
            <Repl._ />
            {/* <Menu._ items={[
                {
                    label: 'a',
                    value: {
                        generate: generate,
                    }
                },
                {
                    label: 'b',
                    value: 'okok'
                }
            ]} onSubmit={onMenuSubmit} />
            <Text>{item.toString()}</Text> */}
            {/* <Text>Select: {item.join(' => ')}</Text> */}
            {/* <Test._ /> */}
        </Box>
    </>
}
