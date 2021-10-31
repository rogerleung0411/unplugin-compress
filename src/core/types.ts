import type {
  ZlibOptions,
  BrotliOptions,
} from 'zlib';

import {
  deflate,
  deflateRaw,
  gzip,
  brotliCompress,
} from 'zlib';
import type { DEFAULT_COMPRESS_OPTION_MAP } from './constants';

export type Algorithm = keyof typeof DEFAULT_COMPRESS_OPTION_MAP;

export type CompressionOptions = Partial<ZlibOptions> | Partial<BrotliOptions>;

export type FileFilter = RegExp | ((file: string) => boolean);

export interface UnpluginCompressOptions {
  /**
   * Log compressed files and their compression ratios.
   * @default true
   */
  verbose?: boolean;

  /**
   * Compression algorithm.
   * @default 'gzip'
   */
  algorithm?: Algorithm;

  /**
   * Compression options for `algorithm`.
   */
  compressionOptions?: CompressionOptions;

  /**
   * Extension name of compressed file.
   * If not specified, `.gz` will be use in gzip algorithm and `.br` in brotliCompress.
   */
  extname?: string;

  /**
   * Only assets bigger than this size are processed (in bytes).
   * @default 0
   */
  threshold?: number;
  /**
   * Include all assets that pass filter assertion.
   * If filter is undefined, nothing will be compressed.
   * @default () => false
   */
  filter: FileFilter;
}

export type AlgorithmRunnerFn =
  | typeof gzip
  | typeof deflate
  | typeof deflateRaw
  | typeof brotliCompress;

export type ResolvedUnpluginCompressOptions = 
  Required<Omit<UnpluginCompressOptions, 'algorithm'>> &
  {
    algorithmName: Algorithm,
    algorithm: AlgorithmRunnerFn
  };

export type OptionsResolver = (options?: UnpluginCompressOptions) => ResolvedUnpluginCompressOptions | null;
