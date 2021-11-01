import { Options } from 'tsup'

export default <Options> {
  entryPoints: [
    'src/*.ts',
  ],
  splitting: true,
  clean: true,
  format: ['cjs', 'esm'],
  dts: true,
}
