import { context } from '~/data.js'

export default () => {
    for (const key in context.c) {
        context.c[key].node.kill();
    }
}