import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import UnpluginCompress from '../../src';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    UnpluginCompress.vite({
      verbose: true,
      filter: /\.(js|css)$/,
      algorithm: 'brotliCompress',
      extname: '.br',
    })
  ]
})
