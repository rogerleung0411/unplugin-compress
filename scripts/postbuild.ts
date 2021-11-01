// ref: https://github.com/antfu/unplugin-icons/blob/main/scripts/postbuild.ts

import { basename } from 'path';
import { promises as fs } from 'fs';
import chalk from 'chalk';
import readFiles from './readFiles';

async function run() {
  // fix cjs exports
  const files = await readFiles();
  for (const file of files) {
    // eslint-disable-next-line no-console
    console.log(chalk.inverse.cyanBright(' POST '), `fix cjs export of`, basename(file));
    let code = await fs.readFile(file, 'utf8');
    code = code.replace('exports.default =', 'module.exports =');
    code += 'exports.default = module.exports;';
    await fs.writeFile(file, code);
  }
}

run();
