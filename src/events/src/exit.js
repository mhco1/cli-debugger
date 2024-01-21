import { context } from '/data'

export const _ = () => {
    for (const key in context.c) {
        context.c[key].node.kill();
    }
}