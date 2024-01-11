import { context } from '~/data.js'

export const has = {
    context: (v) => context.c.hasOwnProperty(v),
}

export const is = {
    context: {
        select: () => context.now.length > 0,
        validFormat: (v) => (/^[A-z][A-z|0-9]*$/g).test(v)
    },

    repl: {
        command: (v) => (v[0] == '.')
    }
}
