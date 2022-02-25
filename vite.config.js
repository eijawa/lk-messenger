import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const path = require('path')

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [AntDesignVueResolver(),],
    }),
    Components({ 
      resolvers: [AntDesignVueResolver(),], 
    })
  ],
  resolve: {
    alias: {
      '~': __dirname,
      '@': path.resolve(__dirname, './src'),
      'assets': `@/assets`,
    }
  }
})
