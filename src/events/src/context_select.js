import { context } from '/data';

export const _ =  (name) => {
    if (!context.c.hasOwnProperty(name)) throw Error('Context not defined');
    context.now = name;
}