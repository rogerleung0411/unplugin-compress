import zlib from 'zlib';

export const PLUGIN_NAME = 'unplugin-compress';

export const SUPPORTED_ALGORITHMS = ['gzip', 'brotliCompress', 'deflate', 'deflateRaw'] as const;

// align to https://github.com/webpack-contrib/compression-webpack-plugin
export const DEFAULT_COMPRESS_OPTION_MAP = {
  gzip: {
    level: zlib.constants.Z_BEST_COMPRESSION,
  },
  deflate: {
    level: zlib.constants.Z_BEST_COMPRESSION,
  },
  deflateRaw: {
    level: zlib.constants.Z_BEST_COMPRESSION,
  },
  brotliCompress: {
    params: {
      [zlib.constants.BROTLI_PARAM_QUALITY]: zlib.constants.BROTLI_MAX_QUALITY,
    },
  },
};

export const DEFAULT_FILTER = /\.(js|mjs|json|css|html)$/i;

export const DEFAULT_GZIP_EXT = '.gz';

export const DEFAULT_BROTLI_EXT = '.br';

export const DEFAULT_LOGGER = {
  error: console.error,
  info: console.info,
};


