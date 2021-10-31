import {
  PLUGIN_NAME,
  createCompressJob,
} from '../core';

import type {
  ResolvedUnpluginCompressOptions,
} from '../core';

import type { Compiler } from 'webpack';

export const webpackConfigFactory = (options: ResolvedUnpluginCompressOptions) => {
  return (compiler: Compiler) => {
    compiler.hooks.assetEmitted.tap(
      PLUGIN_NAME,
      async (file, { content, targetPath }) => {
        if (!options.filter(file)) return;
        await createCompressJob({ filePath: targetPath, content }, options);
      }
    )
  };
};