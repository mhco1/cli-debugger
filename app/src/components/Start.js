import React, { useEffect, useState } from 'react';
import { } from 'ink';
import asciify from 'asciify';
import pkg from '/package.json';
import { toPromise } from '~utils';
import { Text } from '~components';

export default () => {
    const [title, setTitle] = useState('');

    useEffect(() => {
        (async () => {
            const asciify_p = toPromise(asciify);
            const title = (await asciify_p(pkg.name, { font: 'drpepper' }));
            setTitle(title);
        })()
    }, [])

    return <>
        <Text.s2>{title}</Text.s2>
        <Text>Type '.help' for more information</Text>
        <Text>Press CTRL+C or type .exit to exit</Text>
    </>
}