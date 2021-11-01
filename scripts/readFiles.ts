
import { resolve } from 'path';
import fg from 'fast-glob';

export default async () => {
  return await fg('*.js', {
    ignore: ['index.js', 'chunk-*', 'types.js', 'loaders.js'],
    absolute: true,
    cwd: resolve(__dirname, '../dist'),
  });
};