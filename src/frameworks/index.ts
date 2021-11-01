import { viteConfigFactory } from './vite';
import { webpackConfigFactory } from './webpack';
import { rollupPluginFactory } from './rollup';

import type {
  ResolvedUnpluginCompressOptions,
} from '../core';

export const setup = (options: ResolvedUnpluginCompressOptions) => ({
  vite: viteConfigFactory(options),
  webpack: webpackConfigFactory(options),
  rollup: rollupPluginFactory(options),
});