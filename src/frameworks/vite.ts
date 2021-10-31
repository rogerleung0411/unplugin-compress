import path from 'path';
import { ResolvedConfig } from 'vite';
import {
  collectFilePaths,
  compressParallel,
} from '../core';

import type {
  ResolvedUnpluginCompressOptions,
} from '../core';


export const viteConfigFactory = (options: ResolvedUnpluginCompressOptions) => {
  let config: ResolvedConfig;
  let outputPath: string;

  return {
    configResolved(resolvedConfig: ResolvedConfig) {
      config = resolvedConfig;
      outputPath = path.isAbsolute(config.build.outDir)
        ? config.build.outDir
        : path.join(config.root, config.build.outDir)
    },
    async closeBundle() {
      const paths = collectFilePaths(outputPath, options.filter);
      if (!paths.length) return;
      await compressParallel(paths, options, config.logger);
    }
  };
};