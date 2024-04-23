import React, { useState, useEffect } from 'react';
import { } from 'ink';
import { } from '@inkjs/ui';
import * as data from '~data.js';
import { event } from '~events';
import { uuid } from '~utils';

const contextInit = {
    name: '',
    hist: {
        list: [],
        comp: [],
        pos: 0,
        value: {
            script: '', data: null
        },
    },
};

export default () => {
    const getContext = () => {
        const { c, now } = data.context;
        return c[now]
    }
    const [arm, setArm] = useState(getContext());
    const update = () => event.emit('context_update');

    useEffect(() => {
        const eventUpdate = () => setArm({ ...getContext() });

        event.on('context_select', eventUpdate);
        event.on('context_update', eventUpdate);
        // event.on('context_create', eventUpdate);

        if (data.context.start) {
            data.context.start = false;
            setTimeout(() => {
                event.emit('context_create', 'context', contextInit);
                event.emit('context_select', 'context');
            }, 1000)
        };
        return () => {
            event.off('context_select', eventUpdate);
            event.off('context_update', eventUpdate);
            // event.off('context_create', eventUpdate);
        }
    }, [])

    const handleHist = {
        up(newValue) {
            const context = getContext();
            const { pos, list, value } = context.hist;

            if (pos - 1 > -1) {
                if (pos == context.hist.list.length) {
                    context.hist.value = {
                        ...contextInit.hist.value,
                        script: newValue,
                    };
                }
                context.hist.pos = pos - 1;
                update()
            }
        },
        down() {
            const context = getContext();
            const { pos, list, value } = context.hist;

            if (pos + 1 < list.length + 1) {
                context.hist.pos = pos + 1;
                update();
            }
        },
        add(Comp, op = {}) {
            const _op = { ...op, id: uuid() };
            const context = getContext();
            context.hist.list = [...context.hist.list, { ..._op }];
            context.hist.comp = [...context.hist.comp, <Comp {..._op} key={_op.id} />];
            context.hist.value = { ...contextInit.hist.value };
            context.hist.pos = context.hist.list.length;
            update();
        },

        getValue(movePos = 0) {
            const context = getContext();
            if (typeof context == 'undefined') return contextInit.hist.value;
            const { pos, list, value } = context.hist;
            const _pos = pos + movePos;
            const res = _pos == list.length ? value : list[_pos];
            return res
        }
    };

    return [arm || contextInit, update, handleHist];
}