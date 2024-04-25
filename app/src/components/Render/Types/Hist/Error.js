import React, { } from 'react';
import { } from 'ink';
import { } from '@inkjs/ui';
import { Text, ContextArrow } from '~components';

export default ({ script, data, name }) => <>
    <ContextArrow name={name} {...{ script }} />
    <Text.error>{data.value}</Text.error>
</>