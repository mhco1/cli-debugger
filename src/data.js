import meow from 'meow';
import chalk from 'chalk';

export const context = { c: {}, now: '' };

export const cli = meow(
    `
        Usage
          $ cli-debugger

        Options
            --name  Your name

        Examples
          $ cli-debugger --name=Jane
          Hello, Jane
    `,
    {
        importMeta: import.meta,
    },
);

export const codes = {
    arrow: {
        left: '\u276e', // ❮
        rigth: '\u276f', // ❯
    }
};

// export const colors = {
//     black: chalk.hex('#000'),
//     white: chalk.hex('#fff'),
//     s_black: chalk.hex('#444'),
//     s_white: chalk.hex('#bbb'),
//     p1: chalk.hex('#00f'),
//     p2: chalk.hex('#ff0'),
//     p3: chalk.hex('#0f0'),
//     error: chalk.hex('#f00')
// }

export const colors = [
    ['white', chalk.white],
    ['black', chalk.black],
    ['gary', chalk.gray],
    ['p1', chalk.blue],
    ['p2', chalk.yellow],
    ['p3', chalk.green],
    ['error', chalk.red],
]