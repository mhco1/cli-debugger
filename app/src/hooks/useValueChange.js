import React, { useRef } from 'react';
import { } from 'ink';
import { } from '@inkjs/ui';


export default (value = null, callback = () => { }) => {
    const arm = useRef();
    const res =
        typeof arm.current !== 'undefined' &&
        arm.current !== value;
    if (res) callback();
    arm.current = value;
    return res;
}