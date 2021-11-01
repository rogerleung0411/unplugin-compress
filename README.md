# unplugin-compress

[![NPM version](https://img.shields.io/npm/v/unplugin-compress?color=8be9fd&label=)](https://www.npmjs.com/package/unplugin-compress)

A universal compress plugin for Webpack / Vite / Rollup, powered by [Unplugin](https://github.com/unjs/unplugin), generating compressed file using gzip / brotli / etc...

## Usage
> See more usage example in folder `/examples`. Feel free to modify and play it on your own!
### Webpack
```js
// webpack.config.js

const compress = require('unplugin-compress/webpack');

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
    }),
    // etc...
  ]
});

```


### Vite
```js
// in vite.config.ts

import { defineConfig } from 'vite';
import compress from 'unplugin-compress/vite';

export default defineConfig({
  plugins: [
    compress({
      filter: /\.js$/,
    }),
    compress({
      filter: /\.(js|css)$/,
      algorithm: 'brotliCompress',
      extname: '.br',
    }),
  ]
});

```



## Inspiration
- [vite-plugin-compression](https://github.com/anncwb/vite-plugin-compression)
- [compression-webpack-plugin](https://github.com/webpack-contrib/compression-webpack-plugin)
- [unplugin-icons](https://github.com/antfu/unplugin-icons)

## Todo
- [x] Vite support.
- [x] Webpack(both 4 and 5) support.
- [ ] Rollup support(WIP).


