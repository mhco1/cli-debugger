import React, { useEffect, useState } from 'react';
import { } from 'ink';
import { } from '@inkjs/ui';
import { event } from '~events';
import { uuid } from '~utils';

const arm = {};

export default (name = '') => {
    const id = uuid();
    let isDisconnect = false;
    let eventFunction = null;
    const disconnect = () => {
        if(isDisconnect) return
        if (typeof arm[name] !== 'undefined') delete arm[name];
        event.off(id, eventFunction);
        isDisconnect = true;
    }

    const useExternalUpdate = (init = null) => {
        const [value, setValue] = useState(init);

        useEffect(() => {
            eventFunction = (op, el) => {
                const exe = {
                    update: () => setValue(el),
                    value: () => el(value),
                }

                exe[op]();
            };
            event.on(id, eventFunction)

            return () => disconnect()
        }, [])

        return value;
    }

    const control = {
        disconnect,
        update: (value) => {
            if(isDisconnect) return
            event.emit(id, 'update', value);
        },
        get value() {
            if(isDisconnect) return
            let res = null;
            event.emit(id, 'value', (value) => res = value);
            return res
        },

    };
    const res = [control, useExternalUpdate];

    if (name.length < 1) return res;
    if (typeof arm[name] == 'undefined') arm[name] = res;
    return arm[name]
}