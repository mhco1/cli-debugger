import React, { useState } from 'react';
import { } from 'ink';
import { } from '@inkjs/ui';
import { useContext } from '/hooks'
import { RenderHist, RenderInput } from '/components';

export const Hist = (props) => <RenderHist._ {...props}/>;

export const _ = ({ onSubmit }) => {
    const [context, update, hist] = useContext._();
    const [type, setType] = useState('default');

    const modifySetType = (type) => {
        const res = ['value', 'error'].includes(type) ? 'default' : type;
        setType(res);
    };

    const modifyOnSubmit = async (script) => {
        const type = await onSubmit(script);
        modifySetType(type);
    }

    return <>
        {...context.hist.comp}
        <RenderInput._ type={type} setType={modifySetType} onSubmit={modifyOnSubmit} />
    </>
}