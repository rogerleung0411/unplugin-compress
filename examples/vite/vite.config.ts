import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import compress from 'unplugin-compress/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // use br
    compress({
      filter: /\.(js|css)$/,
      algorithm: 'brotliCompress',
      extname: '.br',
    }),
    // use gzip as default
    compress({
      filter: /\.js$/,
    })
  ]
})
