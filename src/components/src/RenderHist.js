import React, { } from 'react';
import { Box } from 'ink';
import { } from '@inkjs/ui';
import { } from '/events';
import { } from '/hooks';
import { componentExternalUpdate } from '/utils';
import { Arrow, Text } from '/components';


const Context = ({ name, script }) => <>
    <Box>
        <Arrow._ name={name} />
        <Text._>{script}</Text._>
    </Box>
</>

export const _ = (props) => {
    const types = {
        value: ({ script, data, name }) => <>
            <Context name={name} {...{ script }} />
            <Text._.s1>{data.value}</Text._.s1>
        </>,
        error: ({ script, data, name }) => <>
            <Context name={name} {...{ script }} />
            <Text._.error>{data.value}</Text._.error>
        </>,
        object: (props) => {
            const useResponse = componentExternalUpdate._('render_object')[1];
            const data = useResponse(null);
            const Data = data ? types[data.type] : () => { };

            return <>
                <Data {...{ ...props, data }} />
            </>
        },
        // function: (props) => {
        //     const useResponse = componentExternalUpdate._('render_function')[1];
        //     const data = useResponse(null);
        //     const Data = data ? types[data.type] : () => { };

        //     return <>
        //         <Data {...{ ...props, data }} />
        //     </>
        // },
        function: ()=><></>
    }

    const Data = types[props.data.type];

    return <>
        <Data {...props} />
    </>
}