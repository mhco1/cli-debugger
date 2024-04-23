import { Resolver } from '@parcel/plugin';
import nodePath from 'path';
import { stat as nodeStat, readdir, readFile } from 'fs/promises';
import * as acorn from 'acorn';
import jsx from 'acorn-jsx';

const acornJsx = acorn.Parser.extend(jsx());
const source = nodePath.normalize('app/src');
const __dirname = nodePath.resolve('');
const __dirsource = nodePath.resolve(__dirname, source);

const standardName = (name) => {
    return name.split('.')[0]
}

const generateFiles = (dir, path, isEvent) => async () => {
    const files = await readdir(dir);
    const res = [];
    for (const i in files) {
        const file = {};
        file.name = files[i];
        file.nameTag = standardName(file.name);
        file.dir = nodePath.resolve(dir, file.name);
        const stat = await nodeStat(file.dir);
        file.value = stat.isFile() ? (await readFile(file.dir, { encoding: 'utf-8' })) : null;
        file.value = acornJsx.parse(file.value, { sourceType: 'module' });
        file.isDefault = file.value !== null && typeof file.value.body.find(el => el.type == 'ExportDefaultDeclaration') !== 'undefined';

        file.code = {};
        file.code.export = `~${nodePath.normalize(`./${path}/${file.name}`)}`;
        file.code.import = `${isEvent ? 'import' : 'export'} ${file.isDefault ? '' : '* as'} ${file.nameTag} from "${file.code.export}";\n`;
        file.code.event = isEvent && `event.on("${file.nameTag}",${file.nameTag});\n`;
        res.push(file)
    }

    return res;
}

export default new Resolver({
    async resolve({ specifier }) {
        if (/^~/g.test(specifier)) {
            const path = nodePath.normalize(specifier.slice(1));
            const dir = nodePath.resolve(__dirsource, path);
            const isEvent = /^events$/g.test(path);
            const stat = await nodeStat(dir);

            if (stat.isFile()) return { filePath: dir };
            if (stat.isDirectory()) {
                const files = await generateFiles(dir, path, isEvent)();
                const code = `${files.map(el => el.code.import).join('\n')}${isEvent ?
                    `import { EventEmitter } from "events";\nexport const event = new EventEmitter;\n${files.map(el => el.code.event).join('\n')}` :
                    ''
                    }`;
                const filePath = nodePath.resolve(`${dir}.js`);
                return { filePath, code }
            }
        }

        return null
    }
})