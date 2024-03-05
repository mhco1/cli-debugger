import React, { useRef } from 'react';
import { Box, Text } from 'ink';
import { } from '@inkjs/ui';
import { event } from '/events';
import { Input as _Input, Arrow, Menu } from '/components';
import { useValueChange } from '/hooks';

const useRender = (Comp, types, stateTypeRender) => {
    const [typeRender, setTypeRender] = stateTypeRender;

    const op = {
        defineType(newTypeRender) {
            const _newTypeRender = newTypeRender in types ? newTypeRender : 'default'
            if (typeRender !== _newTypeRender) setTypeRender(_newTypeRender);
        },
        checkValue() {
            useValueChange._(typeRender, () => {
                Comp.current = types[typeRender];
            })
        }
    }

    return op;
}

export const _ = (props) => {
    const Data = useRef();
    const { handles, value, stateTypeRender, context } = props;
    // const {send} = context;
    // const [typeRender, setTypeRender] = stateTypeRender;
    const [handleSubmit, handleHist] = handles;
    const lastProps = handleHist.getLast();
    const { script, data, name } = lastProps;

    const _handleSubmit = async (...args) => {
        const newTypeRender = await handleSubmit(...args);
        renderOptions.defineType(newTypeRender);
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
                renderOptions.defineType(data.type);
            }

            return <>
                <Menu._ items={createItems(data)} onSubmit={onSubmit} />
            </>
        }
    };

    const renderOptions = useRender(Data, types, stateTypeRender);
    renderOptions.checkValue();

    return <>
        <Data.current />
    </>
}