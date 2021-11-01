import path from 'path';

import {
  compressParallel,
  PLUGIN_NAME,
} from '../core';

import type {
  Plugin
} from 'rollup';

import type {
  ResolvedUnpluginCompressOptions,
} from '../core';

type RollupPluginFactory = (options: ResolvedUnpluginCompressOptions) => Plugin;

export const rollupPluginFactory: RollupPluginFactory = (options) => {
  let outputPath: string;

  return {
    name: PLUGIN_NAME,
    generateBundle({ file, dir }) {
      const outputDir = file && path.dirname(file) || dir || '';
      outputPath = path.isAbsolute(outputDir)
        ? outputDir
        : path.join(process.cwd(), outputDir);
    },
    async writeBundle(_, bundles) {
      const paths =
        Object
          .keys(bundles)
          .filter(filename => options.filter(filename))
          .map(name => path.join(outputPath, name));
      await compressParallel(paths, options);
    }
  };
}