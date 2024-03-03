import React, { useRef } from 'react';
import { Box, Text } from 'ink';
import { } from '@inkjs/ui';
import { event } from '/events';
import { Input as _Input, Arrow, Menu } from '/components';
import { useValueChange } from '/hooks';


export const _ = (props) => {
    const Data = useRef();
    const { handles, value, stateTypeRender, context } = props;
    // const {send} = context;
    const [typeRender, setTypeRender] = stateTypeRender;
    const [handleSubmit, handleHist] = handles;
    const lastProps = handleHist.getLast();
    const { script, data, name } = lastProps;

    const _handleSubmit = async (...args) => {
        const newTypeRender = await handleSubmit(...args);
        if (typeRender !== newTypeRender) setTypeRender(
            newTypeRender in types ? newTypeRender : 'default'
        );
    }

    const types = {
        default: () => <>
            <Box>
                <Arrow._ name={name} />
                <_Input._ onSubmit={_handleSubmit} onHistory={handleHist} value={value} />
            </Box>
        </>,
        object: () => {
            const createItems = (data) => data.props.map(el => {
                // {
                //     label: `${el.name}: ${el.value}`, value: el
                // }

                const res = {
                    label: `${el.name}: ${el.value ?? `[${el.type}]`}`,
                    value: el,
                };

                if (el.type == 'object') res.execute = () => {
                    return ['aaa', 'bbb', 'ccc']
                };

                return res
            });

            const onSubmit = (_data) => {
                const [pos, data] = _data;
                event.emit('RenderComp_objectSelect', { script, data, name });
                if (data.type !== 'object') setTypeRender('default');
            }

            return <>
                <Menu._ items={createItems(data)} onSubmit={onSubmit} />
            </>
        }
    };

    useValueChange._(typeRender, () => {
        Data.current = types[typeRender];
    })

    return <>
        <Data.current />
    </>
}