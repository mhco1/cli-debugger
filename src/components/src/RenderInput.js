import React, { } from 'react';
import { Box } from 'ink';
import { } from '@inkjs/ui';
import { event } from '/events';
import { Input, Arrow, Menu, Text } from '/components';
import { useContext } from '/hooks';
import { toPromise, componentExternalUpdate } from '/utils';
import * as _data from '/data';

export const _ = ({ onSubmit, type, setType }) => {
    const [context, update, hist] = useContext._();

    const types = {
        default: () => {
            const { script, data } = hist.getValue();

            return <>
                <Box>
                    <Arrow._ name={context.name} />
                    <Input._
                        onSubmit={onSubmit}
                        onHistory={hist}
                        value={script}
                    />
                </Box>
            </>
        },
        object: () => {
            const { script, data = { props: [] } } = hist.getValue(-1);
            const response = componentExternalUpdate._('render_object')[0];
            const handleSubmit = ({ value }) => {
                response.update(value);
                response.disconnect();
                setType('value');
            }

            const objectCreateItems = (data) => {
                if (data.length == 0) {
                    return [{
                        label: <Text._.gray >Not have properties</Text._.gray>,
                        value: { type: 'value' },
                    }]
                }
            
                return data.map(el => {
                    const res = {
                        label: `${el.name}: ${el.value || `[${el.type}]`}`,
                        value: el,
                    };
            
                    if (el.type == 'object') res.execute = async () => {
                        const getProps = toPromise._((fn) => event.emit('context_get_props', el.id, fn));
                        const data = await getProps();
                        const res = objectCreateItems(data);
                        return {
                            path: el.name,
                            data: res
                        }
                    };
            
                    return res
                })
            };

            return <>
                <Menu.submenu
                    items={objectCreateItems(data.props)}
                    onSubmit={handleSubmit}
                />
            </>
        },
        function: () => {

            
            return <>
                <Text._>ok</Text._>
            </>   
        }
    };

    const Data = types[type];

    return <>
        <Data />
    </>
}