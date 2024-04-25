import React, { useState } from 'react';
import { } from 'ink';
import { } from '@inkjs/ui';
import { useContext } from '~hooks'
import { Render } from '~components';

export default ({ onSubmit }) => {
    const [context, update, hist] = useContext();
    const [type, setType] = useState('Default');

    const modifySetType = (type) => {
        const res = ['Value', 'Error'].includes(type) ? 'Default' : type;
        setType(res);
    };

    const modifyOnSubmit = async (script) => {
        const type = await onSubmit(script);
        modifySetType(type);
    }

    return <>
        {context.hist.comp}
        <Render.Input type={type} setType={modifySetType} onSubmit={modifyOnSubmit} />
    </>
}