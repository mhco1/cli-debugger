import { Reporter } from '@parcel/plugin';
import sh from 'shelljs'

export default new Reporter({
    report({ event }) {
        if (event.type === 'buildSuccess') {
            let bundles = event.bundleGraph.getBundles();
            process.stdout.write(`✨ Built ${bundles.length} bundles in ${event.buildTime}ms!\n`);
            sh.chmod('+x', 'dist/cli.js');
        }
    }
});