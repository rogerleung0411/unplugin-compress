const fs = require('fs');
const path = require('path');
const Compress = require('../../dist/webpack');

const distPath = path.resolve(__dirname, './dist');

fs.rmdirSync(distPath, { recursive: true });

/**
 * @type { import('webpack').Configuration }
 */
module.exports = ({
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: distPath,
  },
  plugins: [
    Compress({
      filter: /\.js$/,
    }),
    Compress({
      filter: /main\.js$/,
      algorithm: 'brotliCompress',
      extname: '.br',
    })
  ]
});