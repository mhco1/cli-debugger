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

export const colors = [
    ['white', chalk.white],
    ['black', chalk.black],
    ['gray', chalk.gray],
    ['p1', chalk.blueBright],
    ['p2', chalk.magentaBright],
    ['s1', chalk.yellowBright],
    ['s2', chalk.greenBright],
    ['error', chalk.redBright],
]