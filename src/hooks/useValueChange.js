import React, { useRef } from 'react';
import { } from 'ink';
import { } from '@inkjs/ui';


export const _ = (value, callback = () => { }) => {
    const storeValue = useRef();
    const res = typeof storeValue === 'undefined' || storeValue !== 'value';
    if (res) callback();
    storeValue.current = value;
    return res;
}