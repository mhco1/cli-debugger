import React, {  } from 'react';
import {  } from 'ink';
import {  } from '@inkjs/ui';
import { event } from '~events';
import { Text } from '~components';

const objectCreateItems = (data) => {
    if (data.length == 0) {
        return [{
            label: <Text.gray >Not have properties</Text.gray>,
            value: { type: 'Value' },
        }]
    }

    return data.map(el => {
        const res = {
            label: `${el.name}: ${el.value || `[${el.type}]`}`,
            value: el,
        };

        if (el.type == 'Object') res.execute = async () => {
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

export default objectCreateItems