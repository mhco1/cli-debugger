import React, { } from 'react';
import { Box } from 'ink';
import { } from '@inkjs/ui';
import { componentExternalUpdate } from '~utils';
import { Arrow, Text } from '~components';


const Context = ({ name, script }) => <>
    <Box>
        <Arrow name={name} />
        <Text>{script}</Text>
    </Box>
</>

export default (props) => {
    const types = {
        value: ({ script, data, name }) => <>
            <Context name={name} {...{ script }} />
            <Text.s1>{data.value}</Text.s1>
        </>,
        error: ({ script, data, name }) => <>
            <Context name={name} {...{ script }} />
            <Text.error>{data.value}</Text.error>
        </>,
        object: (props) => {
            const useResponse = componentExternalUpdate('render_object')[1];
            const data = useResponse(null);
            const Data = data ? types[data.type] : () => <></>;

            return <>
                <Data {...{ ...props, data }} />
            </>
        },
        function: (props) => {
            const useResponse = componentExternalUpdate('render_function')[1];
            const data = useResponse(null);
            const Data = data ? types[data.type] : () => <></>;

            return <>
                <Data {...{ ...props, data }} />
            </>
        },
        // function: ()=><></>
    }

    const Data = types[props.data.type];

    return <>
        <Data {...props} />
    </>
}