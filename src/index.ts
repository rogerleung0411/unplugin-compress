import { createUnplugin } from 'unplugin';

import {
  PLUGIN_NAME,
  resolveOptions,
} from './core';
import { viteConfigFactory } from './factory/vite';

import type {
  UnpluginCompressOptions
} from './core';

export default createUnplugin<UnpluginCompressOptions>(rawOptions => {
  const emptyPlugin = { name: PLUGIN_NAME };
  const options = resolveOptions(rawOptions);

  if (!options) {
    return emptyPlugin;
  }

  return {
    ...emptyPlugin,
    enforce: 'post',
    vite: viteConfigFactory(options),
  };
});
