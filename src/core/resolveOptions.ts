import zlib from 'zlib';
import chalk from 'chalk';
import { isRegExp } from 'lodash';

import {
  PLUGIN_NAME,
  DEFAULT_GZIP_EXT,
  DEFAULT_BROTLI_EXT,
  DEFAULT_FILTER,
  DEFAULT_COMPRESS_OPTION_MAP,
  SUPPORTED_ALGORITHMS,
} from './constants';

import type {
  Algorithm,
  OptionsResolver,
} from './types';

export const resolveOptions: OptionsResolver = (options) => {
  const {
    verbose = true,
    algorithm = 'gzip',
    extname = '.gz',
    compressionOptions,
    threshold = 0,
    filter = DEFAULT_FILTER,
  } = options || {};

  if (
    !validateAlgorithm(algorithm) ||
    !validateExtname(algorithm, extname)
  ) {
    return null;
  }

  return {
    verbose,
    extname,
    threshold,
    // override filter to function and no need to call isRegExp internally.
    filter: isRegExp(filter)
      ? (file: string) => filter.test(file)
      : filter,
    compressionOptions: {
      ...DEFAULT_COMPRESS_OPTION_MAP[algorithm],
      ...(compressionOptions || {}),
    },
    algorithm: zlib[algorithm],
    algorithmName: algorithm,
  };
}

export const validateAlgorithm = (algorithm: Algorithm) => {
  if (SUPPORTED_ALGORITHMS.includes(algorithm)) {
    return true;
  }
  console.log(`[${PLUGIN_NAME}]: ${chalk.yellowBright((`algorithm ${algorithm} is not supported`))}`);
  return false;
}


export const validateExtname = (algorithm: Algorithm, extname: string) => {
  // we only validate gzip & brotli,
  // cause there's various extname names for deflate / deflate raw.
  if (
    algorithm === 'gzip' && extname !== DEFAULT_GZIP_EXT ||
    algorithm === 'brotliCompress' && extname !== DEFAULT_BROTLI_EXT
  ) {
    console.log(`[${PLUGIN_NAME}]: ${chalk.yellowBright('extname name does not match algorithm.')}`);
    // return false;
  }

  return true;
}

