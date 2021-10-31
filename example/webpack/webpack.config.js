const fs = require('fs');
const path = require('path');

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
    require('../../dist').default.webpack({
      filter: /\.js$/,
    }),
    require('../../dist').default.webpack({
      filter: /main\.js$/,
      algorithm: 'brotliCompress',
      extname: '.br',
    })
  ]
});