import { context } from '/data'

export const props = (props) => {
    return props.map(({ name, value }) => (
        /string|number|boolean/g.test(value.type) ?
            { type: 'value', name, value: value.value } :
            value.type == 'object' ?
                value.subtype == 'array' ?
                    { type: 'array', name } :
                    { type: 'object', name, id: value.objectId } :
                value.type == 'function' ?
                    { type: 'function', name } :
                    {}
    ))
};

export const evaluate = async (evaluate) => {
    const node = context.c[context.now];

    if (/EvalError|InternalError|RangeError|ReferenceError|SyntaxError|TypeError|URIError/g.test(evaluate.className)) return {
        type: 'error', value: evaluate.description,
    }

    if (evaluate.type === 'undefined' || /string|number|boolean/g.test(evaluate.type)) return {
        type: 'value', value: evaluate.value || '',
    };

    if (/function|object/g.test(evaluate.type)) {
        const res = {};
        const _props = (await node.send('props', { id: evaluate.objectId })).result;

        if (evaluate.type == 'object') {
            res.type = evaluate.subtype == 'array' ? 'array' : 'object';
            res.props = props(_props);
            return res
        }

        return {
            type: 'function', name: _props.filter(el => el.name == 'name')[0].value.value
        }
    }
}