import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import 'dotenv/config';

import manifest from './baseManifest';

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@assets': path.resolve(__dirname, './src/assets'),
            '@components': path.resolve(__dirname, './src/components'),
            '@public': path.resolve(__dirname, './src/public'),
            '@images': path.resolve(__dirname, './public/images'),
        },
    },
    plugins: [
        react(),
        VitePWA({
        registerType: 'autoUpdate',
            manifest
        })
    ],
    base: process.env.APP_BASE_PATH || '/beast-companion/',
    build: {
        outDir:  process.env.APP_BUILD_DIR || 'dist'
    },
    preview: {
        port: Number(process.env.APP_PREVIEW_PORT) || 8080
    }
})
