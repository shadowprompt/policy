import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

import AutoImport from 'unplugin-auto-import/vite'

import Components from 'unplugin-vue-components/vite'

import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'




// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
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
