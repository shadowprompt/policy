import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { createHtmlPlugin } from 'vite-plugin-html';
import AutoImport from 'unplugin-auto-import/vite'

import Components from 'unplugin-vue-components/vite'

import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { configMap } from './projectConfig.js'
const projectName = process.env.PROJECT_NAME



// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: `dist-${projectName}`, // 输出到di
    // rollupOptions: {
    //   input: {
    //     main: './index.html',
    //     water: './water.html'
    //   }
    // }
  },
  plugins: [
    vue(),
    vueDevTools(),
    createHtmlPlugin(configMap[projectName]),
    AutoImport({

      resolvers: [ElementPlusResolver()],

     }),

     Components({

      resolvers: [ElementPlusResolver()],

     })
  ],
  server: {
    open: true, // 自动打开浏览器
  },
  devServer: {
    proxy: 'http://8.148.20.105:9090'
    // proxy: 'http://172.20.10.3:5173'
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
