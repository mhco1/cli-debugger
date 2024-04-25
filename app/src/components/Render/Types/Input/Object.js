import React, { } from 'react';
import { } from 'ink';
import { } from '@inkjs/ui';
import { Menu } from '~components';
import { useContext } from '~hooks';
import { componentExternalUpdate, objectCreateItems } from '~utils';


export default ({ onSubmit, type, setType }) => {
    const [context, update, hist] = useContext();
    const { script, data = { props: [] } } = hist.getValue(-1);
    const response = componentExternalUpdate('render_object')[0];
    const handleSubmit = ({ value }) => {
        response.update(value);
        response.disconnect();
        setType('Value');
    }

    return <>
        <Menu.Submenu
            items={objectCreateItems(data.props)}
            onSubmit={handleSubmit}
        />
    </>
}