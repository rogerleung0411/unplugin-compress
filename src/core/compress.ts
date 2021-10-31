import path from 'path';
import os from 'os';
import chalk from 'chalk';
import fs from 'fs-extra';
import { DEFAULT_LOGGER } from './constants';
import { sizeFormatter, runParallel } from './utils';

import type {
  ResolvedUnpluginCompressOptions,
} from './types';
import { PLUGIN_NAME } from '.';

export const compress = async (
  source: Buffer,
  {
    algorithm,
    compressionOptions,
  }: ResolvedUnpluginCompressOptions,
) => {
  return new Promise<Buffer>((resolve, reject) => {
    // @ts-ignore
    algorithm(source, compressionOptions, (err: Error | null, result: Buffer) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

export const createCompressJob = async (
  filePath: string,
  options: ResolvedUnpluginCompressOptions,
  logger = DEFAULT_LOGGER,
) => {
  const { extname, verbose, algorithmName } = options;
  const compressedName = path.basename(filePath) + extname;

  try {
    const sourceBuf = await fs.readFile(filePath);
    const outputBuf = await compress(sourceBuf, options);
  
    if (verbose) {
      const outputSize = sizeFormatter(outputBuf);
      logger.info(
        `[${PLUGIN_NAME}]: ` + 
        `${chalk.cyanBright(compressedName)} generated. ` +
        `${algorithmName}: ${outputSize}`
      );
    }
  
    await fs.writeFile(`${filePath}${extname}`, outputBuf);
  } catch (e) {
    logger.info(
      `[${PLUGIN_NAME}]: ` + 
      `generate ${compressedName} failed.` + e
    );
  }
};

export const compressParallel = (
  paths: string[],
  options: ResolvedUnpluginCompressOptions,
  logger = DEFAULT_LOGGER,
) => {
  return runParallel(
    os.cpus.length,
    paths, 
    (path) => createCompressJob(path, options, logger)
  );
};