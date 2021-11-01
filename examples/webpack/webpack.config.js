const fs = require('fs');
const path = require('path');
const compress = require('unplugin-compress/webpack');

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
    compress({
      filter: /\.js$/,
    }),
    compress({
      filter: /main\.js$/,
      algorithm: 'brotliCompress',
      extname: '.br',
    })
  ]
});