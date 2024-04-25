import React, { } from 'react';
import { } from 'ink';
import { } from '@inkjs/ui';
import { event } from '~events';
import { Menu, Text } from '~components';
import { useContext } from '~hooks';
import { toPromise, componentExternalUpdate } from '~utils';

const objectCreateItems = (data) => {
    if (data.length == 0) {
        return [{
            label: <Text.gray >Not have properties</Text.gray>,
            value: { type: 'value' },
        }]
    }

    return data.map(el => {
        const res = {
            label: `${el.name}: ${el.value || `[${el.type}]`}`,
            value: el,
        };

        if (el.type == 'object') res.execute = async () => {
            const getProps = toPromise((fn) => event.emit('context_get_props', el.id, fn));
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

export default ({ onSubmit, type, setType }) => {
    const [context, update, hist] = useContext();
    const { script, data = { props: [] } } = hist.getValue(-1);
    const response = componentExternalUpdate('render_object')[0];
    const handleSubmit = ({ value }) => {
        response.update(value);
        response.disconnect();
        setType('value');
    }

    return <>
        <Menu.Submenu
            items={objectCreateItems(data.props)}
            onSubmit={handleSubmit}
        />
    </>
}