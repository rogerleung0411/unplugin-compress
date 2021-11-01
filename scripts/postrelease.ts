import { basename } from 'path';
import { promises as fs } from 'fs';
import readFiles from './readFiles';

async function run() {
  const files = await readFiles();
  for (const file of files) {
    const name = basename(file, '.js');
    await fs.rm(`${name}.d.ts`);
  }
}

run();