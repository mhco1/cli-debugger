import React from 'react';
import { Text } from 'ink';
import asciify from 'asciify';
import pkg from '/package.json';
import { toPromise } from '/utils';

const asciify2 = toPromise._(asciify);
const title = await asciify2(pkg.name, { font: 'drpepper' });

export const _ = () => {
    return <>
        <Text color='#00ff00'>{title}</Text>
        <Text>Type '.help' for more information</Text>
        <Text>Press CTRL+C or type .exit to exit</Text>
    </>
}