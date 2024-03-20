import React, { useEffect, useState } from 'react';
import { Box } from 'ink';
import { } from '@inkjs/ui';
import { event } from '/events';
import { Input as _Input, Arrow, Text } from '/components';


const Context = ({ name, script }) => <>
    <Box>
        <Arrow._ name={name} />
        <Text._>{script}</Text._>
    </Box>
</>

export const _ = (props) => {
    const { script, data, name } = props

    const types = {
        value: () => <>
            <Context {...props} />
            <Text._.s1>{data.value}</Text._.s1>
        </>,
        error: () => <>
            <Context {...props} />
            <Text._.error>{data.value}</Text._.error>
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
                            <Text._.s1>{data.value}</Text._.s1>
                        </> :
                        <></>
                }
            </>
        },
        function: () =>{
            return <Text._>[ Function ({data.name}) ]</Text._>
        }
    }

    const Data = types[data.type];

    return <>
        <Data />
    </>
}