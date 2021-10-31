import fs from 'fs';
import path from 'path';

import type { FileFilterFn } from './types';

export const getBufferSizeOfKB = (buf: Buffer) => (buf.byteLength / 1024).toFixed(2) + 'kb';

export const collectFilePaths = (root: string, filter: FileFilterFn = () => false) => {
  const paths: string[] = [];

  try {
    if (fs.existsSync(root)) {
      const stat = fs.lstatSync(root);
      if (stat.isDirectory()) {
        const files = fs.readdirSync(root);
        // dfs traversal here.
        files.forEach(function (file) {
          const ps = collectFilePaths(path.join(root, '/', file), filter);
          paths.push(...ps);
        });
      } else {
        if (filter(root)) {
          paths.push(root);
        }
      }
    }
  } catch (error) {
    // do nothing;
  }

  return paths;
};

export const runParallel = async (
  maxConcurrency: number,
  paths: string[],
  iteratorFn: (path: string) => Promise<void>
) => {
  const ret = [];
  const executing: Promise<void>[] = [];

  for (const path of paths) {
    const p = Promise.resolve().then(() => iteratorFn(path));
    ret.push(p);

    if (maxConcurrency <= paths.length) {
      const e: Promise<void> = p.then(() => {
        executing.splice(executing.indexOf(e), 1)
      });
      executing.push(e);
      if (executing.length >= maxConcurrency) {
        await Promise.race(executing);
      }
    }
  }

  return Promise.all(ret);
};