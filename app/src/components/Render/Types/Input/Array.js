import React, { } from 'react';
import { } from 'ink';
import { } from '@inkjs/ui';
import { Menu } from '~components';
import { useContext } from '~hooks';
import { componentExternalUpdate, menu } from '~utils';


export default ({ onSubmit, type, setType }) => {
    const [context, update, hist] = useContext();
    const { script, data = { props: [] } } = hist.getValue(-1);
    const response = componentExternalUpdate('render_array')[0];
    const handleSubmit = ({ value }) => {
        response.update(value);
        response.disconnect();
        setType('Value');
    }

    return <>
        <Menu.Submenu
            items={menu.createItems(data.props)}
            onSubmit={handleSubmit}
        />
    </>
}