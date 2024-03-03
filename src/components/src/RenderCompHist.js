import React, { useEffect, useState } from 'react';
import { Box, Text } from 'ink';
import { } from '@inkjs/ui';
import { event } from '/events';
import { Input as _Input, Arrow } from '/components';


const Context = ({ name, script }) => <>
    <Box>
        <Arrow._ name={name} />
        <Text>{script}</Text>
    </Box>
</>

export const _ = (props) => {
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
        object: () => {
            // const [isContent, setIsContent] = useState(false);
            const [arm, setArm] = useState({ isContent: false, res: {} });
            const { script, data, name } = arm.res;

            useEffect(() => {
                event.on('RenderComp_objectSelect', res => {
                    arm.isContent = true;
                    arm.res = res;
                    setArm({ ...arm });
                    event.removeAllListeners('RenderComp_objectSelect');
                })
            }, [])

            return <>
                {
                    arm.isContent ?
                        <>
                            <Context {...props} />
                            <Text color="#ffff00">{data.value}</Text>
                        </> :
                        <></>
                }
            </>
        }
    }

    const Data = types[data.type];

    return <>
        <Data />
    </>
}