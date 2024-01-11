import React from 'react';
import { Text } from 'ink';
import asciify from 'asciify';
import toPromise from '~/utils/toPromise.js';
import pkg from '~/utils/pkg.js';

const asciify2 = toPromise(asciify);
const title = await asciify2(pkg.name, { font: 'drpepper' });

export default () => {
    return <>
        <Text color='#00ff00'>{title}</Text>
        <Text>Type '.help' for more information</Text>
        <Text>Press CTRL+C or type .exit to exit</Text>
    </>
}