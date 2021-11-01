const compress = require('unplugin-compress/rollup');

/**
 * @type { import('rollup').RollupOptions }
 */
module.exports = ({
  
  input: 'src/index.js',

  output: {
    dir: 'dist',
    format: 'es',
  },

  external: ['jquery'],
  
  plugins: [
    // gzip
    compress({
      filter: /vendor/,
    }),
    // brotli
    compress({
      filter: /index/,
      algorithm: 'brotliCompress',
      extname: '.br'
    })
  ],
});