import React from 'react';
import { } from 'ink';
import asciify from 'asciify';
import pkg from '/package.json';
import { toPromise } from '/utils';
import { Text } from '/components'
// import { colors } from '/data';

const asciify2 = toPromise._(asciify);
const title = await asciify2(pkg.name, { font: 'drpepper' });

export const _ = () => {
    return <>
        <Text._ p3>{title}</Text._>
        <Text._>Type '.help' for more information</Text._>
        <Text._>Press CTRL+C or type .exit to exit</Text._>
    </>
}