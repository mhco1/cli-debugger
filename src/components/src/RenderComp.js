import React, { } from 'react';
import { Box, Text } from 'ink';
import { Input as _Input, Arrow } from '/components';


const Context = ({ name, script }) => <>
    <Box>
        <Arrow._ name={name} />
        <Text>{script}</Text>
    </Box>
</>

export const Hist = (props) => {
    const { script, data, name } = props

    const types = {
        value: () => <>
            <Context {...props} />
            <Text color="#ffff00">{data.value}</Text>
        </>,
        error: () => <>
            <Context {...props} />
            <Text color="#ff0000">{data.value}</Text>
        </>,
    }

    const Data = types[data.type];

    return <>
        <Data />
    </>
}

export const Input = ({ handles, value }) => {
    const [handleSubmit, handleHist] = handles;
    const lastProps = handleHist.getLast();
    const { script, data, name } = lastProps;

    const types = {
        value: () => <>
            <Box>
                <Arrow._ name={name} />
                <_Input._ onSubmit={handleSubmit} onHistory={handleHist} value={value} />
            </Box>
        </>
    };

    types.error = types.value;

    // const inputType = ['value', 'error'].includes(data.type) ? 'value' : '';
    const Data = typeof data !== 'undefined' ? types[data.type] : types.value;

    return <>
        <Data />
    </>
}