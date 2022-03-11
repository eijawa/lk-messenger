import path from 'path';
import { defineConfig } from 'vite';

import Vue from '@vitejs/plugin-vue';
import replace from '@rollup/plugin-replace';
import { VitePWA } from 'vite-plugin-pwa';


const pwaOptions = {
  mode: 'development',
  base: '/',
  includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
  manifest: {
    name: 'Volsu messenger',
    short_name: 'Volsu messenger',
    description: 'Volsu messenger application',
    theme_color: '#ffffff',
    icons: [
      {
        src: 'pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: 'pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
  },
  devOptions: {
    enabled: process.env.SW_DEV === 'true',
    /* when using generateSW the PWA plugin will switch to classic */
    type: 'module',
    navigateFallback: 'index.html',
  },
};

const replaceOptions = { __DATE__: new Date().toISOString() };
const claims = process.env.CLAIMS === 'true';
const reload = process.env.RELOAD_SW === 'true';

if (process.env.SW === 'true') {
  pwaOptions.srcDir = 'src';
  pwaOptions.filename = claims ? 'claims-sw.ts' : 'prompt-sw.ts';
  pwaOptions.strategies = 'injectManifest';
  pwaOptions.manifestname = 'PWA Inject Manifest';
  pwaOptions.manifest.short_name = 'PWA Inject';
}

if (claims)
  pwaOptions.registerType = 'autoUpdate';

if (reload) {
  // @ts-ignore
  // eslint-disable-next-line no-underscore-dangle
  replaceOptions.__RELOAD_SW__ = 'true';
}

export default defineConfig({
  root: path.resolve(__dirname, 'src'),
  publicDir: path.resolve(__dirname, 'public'),
  build: {
    sourcemap: process.env.SOURCE_MAP === 'false',
    outDir: path.resolve(__dirname, 'dist'),
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, 'src/index.html'),
      },
    },
  },
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    Vue({
      include: [/\.vue$/],
    }),
    VitePWA(pwaOptions),
    replace(replaceOptions),
  ],
});
