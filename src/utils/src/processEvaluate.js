export const _ = async (evaluate, { send }) => {

    if (evaluate.className == 'ReferenceError') return {
        type: 'error', value: evaluate.description,
    }

    if (typeof evaluate.type === 'undefined' || /string|number|boolean/g.test(evaluate.type)) return {
        type: 'value', value: evaluate.value || '',
    };

    if (/function|object/g.test(evaluate.type)) {
        const res = {};
        const props = (await send('props', { id: evaluate.objectId })).result;

        if (evaluate.type == 'object') {
            res.type = evaluate.subtype == 'array' ? 'array' : 'object';
            res.props = props.map(({ name, value }) => (
                /string|number|boolean/g.test(value.type) ?
                    { type: 'value', name, value: value.value } :
                    value.type == 'object' ?
                        value.subtype == 'array' ?
                            { type: 'array', name } :
                            { type: 'object', name } :
                        value.type == 'function' ?
                            { type: 'function', name } :
                            undefined
            ))

            return res
        }

        return {
            type: 'function', name: props.filter(el => el.name == 'name')[0].value.value
        }
    }
}