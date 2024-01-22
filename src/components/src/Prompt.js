import React, { isValidElement } from 'react';
import { Box, Text, useApp } from 'ink';
import { Input } from '/components';

const Arrow = ({ name }) => <>
    <Box marginRight={1}>
        <Text color='#0000ff'>{`${name} >`}</Text>
    </Box>
</>

export const _ = {

    Input(props) {

        return <>
            <Box>
                <Arrow name={props.name} />
                <Input._ {...props} />
            </Box>
        </>
    },

    Log({ name, children }) {

        return <>
            <Box>
                {
                    typeof children == 'string' ?
                        <>
                            <Arrow name={name} />
                            <Text>{children}</Text>
                        </> :
                        isValidElement(children) ?
                            children :
                            <>
                                <Arrow name={name} />
                                <Text>{
                                    String(JSON.stringify(children))
                                }</Text>
                            </>
                }
            </Box>
        </>
    }

}

