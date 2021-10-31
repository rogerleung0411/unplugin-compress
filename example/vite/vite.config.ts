import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import UnpluginCompress from '../../dist';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    UnpluginCompress.vite({
      filter: /\.(js|css)$/,
      algorithm: 'brotliCompress',
      extname: '.br',
    }),
    // UnpluginCompress.vite({
    //   filter: /\.js$/,
    // })
  ]
})
