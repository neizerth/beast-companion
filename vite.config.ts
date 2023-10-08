import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import 'dotenv/config';

import manifest from './baseManifest';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      react(),
      VitePWA({
          registerType: 'autoUpdate',
          manifest
      })
  ],
    base: process.env.APP_BASE_PATH || '/beast-digital-map/',
    build: {
        outDir:  process.env.APP_BUILD_DIR || 'dist'
    },
    preview: {
        port: Number(process.env.APP_PREVIEW_PORT) || 8080
    }
})
