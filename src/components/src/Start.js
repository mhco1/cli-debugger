import React from 'react';
import { } from 'ink';
import asciify from 'asciify';
import pkg from '/package.json';
import { toPromise } from '/utils';
import { Text } from '/components'

const asciify2 = toPromise._(asciify);
const title = await asciify2(pkg.name, { font: 'drpepper' });

export const _ = () => {
    return <>
        <Text._.s2>{title}</Text._.s2>
        <Text._>Type '.help' for more information</Text._>
        <Text._>Press CTRL+C or type .exit to exit</Text._>
    </>
}