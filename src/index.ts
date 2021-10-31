import { createUnplugin } from 'unplugin';

import {
  PLUGIN_NAME,
  resolveOptions,
} from './core';
import { setup as setupFrameworks } from './frameworks';

import type {
  UnpluginCompressOptions
} from './core';

export * as core from './core';

export default createUnplugin<UnpluginCompressOptions>(rawOptions => {
  const emptyPlugin = { name: PLUGIN_NAME };
  const options = resolveOptions(rawOptions);

  if (!options) {
    return emptyPlugin;
  }

  return {
    ...emptyPlugin,
    enforce: 'post',
    ...setupFrameworks(options),
  };
});
