import React, { useRef } from 'react';
import { Box } from 'ink';
import { } from '@inkjs/ui';
import { event } from '/events';
import { Input as _Input, Arrow, Menu, Text } from '/components';
import { useValueChange } from '/hooks';
import { toPromise } from '/utils';

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

const objectCreateItems = (data) => {
    if (data.length == 0) {
        return [{
            label: <Text._.gray >Not have properties</Text._.gray>,
            value: '',
        }]
    }

    return data.map(el => {
        // {
        //     label: `${el.name}: ${el.value}`, value: el
        // }

        const res = {
            label: `${el.name}: ${el.value ?? `[${el.type}]`}`,
            value: el,
        };

        if (el.type == 'object') res.execute = async () => {
            const getProps = toPromise._((fn) => event.emit('context_get_props', el.id, fn));
            const data = await getProps();
            const res = objectCreateItems(data);
            return {
                label: el.name,
                data: res
            }
        };

        return res
    })
};

export const _ = (props) => {
    const Data = useRef();
    const { handles, value, stateTypeRender, context } = props;
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
            const onSubmit = (_data) => {
                const [pos, data] = _data;
                if (data.type !== 'object') event.emit('RenderComp_objectSelect', { script, data, name });
                renderOptions.defineType(data.type);
            }

            return <>
                <Menu._ items={objectCreateItems(data.props)} onSubmit={onSubmit} />
            </>
        }
    };

    const renderOptions = useRender(Data, types, stateTypeRender);
    renderOptions.checkValue();

    return <>
        <Data.current />
    </>
}