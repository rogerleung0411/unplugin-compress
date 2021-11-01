import chalk from 'chalk';
import { basename } from 'path';
import { promises as fs } from 'fs';

import readFiles from './readFiles';


async function run() {
  const files = await readFiles();
  for (const file of files) {
    console.log(chalk.inverse.cyanBright(' PRE '), `gen dts of`, basename(file));
    const name = basename(file, '.js');
    await fs.writeFile(`${name}.d.ts`, `export { default } from './dist/${name}'\n`);
  }
}

run();