import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

import removeConsole from 'vite-plugin-remove-console';
import preload from 'vite-plugin-preload';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import checker from 'vite-plugin-checker';
import path from 'node:path';


export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const PROD_HOST = env.VITE_PROD_HOST;
  const DEV_HOST  = env.VITE_DEV_HOST;
  const MODE      = env.VITE_MODE;
  const DOMAIN    = env.VITE_DOMAIN;
  const SSL_KEY   = env.VITE_SSL_KEY;
  const SSL_CRT   = env.VITE_SSL_CRT;
  const PORT      = Number(env.VITE_PORT);

  if (
    !PROD_HOST ||
    !DEV_HOST  ||
    !MODE      ||
    !DOMAIN    ||
    isNaN(PORT)
  ) throw new Error('Hasn`t some environments in vite.config.ts');

  const isProd    = MODE === 'prod';
  const isAnalyze = MODE === 'analyze';

  return {
    plugins: [
      react(),
      svgr(),
      preload(),
      VitePWA({
        registerType: 'autoUpdate',
        workbox: {
          globPatterns: ['**/*.{html,css,js,png,jpg,svg}'],
          maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
        }
      }),
      ViteImageOptimizer({
        png: { quality: 70 },
        jpeg: {
          quality: 70,
          progressive: true,
        },
        jpg: {
          quality: 70,
          progressive: true,
        },
        webp: { quality: 65 },
        avif: { quality: 50 },
        svg: { multipass: true },
      }),
      checker({ typescript: true }),
      removeConsole({
        includes: ['error', 'warn', 'log', 'info', 'debug'],
      }),
      ...(isAnalyze ? [visualizer({
        filename: './dist/stats.html',
        title: 'Vite Bundle Analysis',
        open: true,
        template: 'treemap',
        gzipSize: true,
        brotliSize: true,
      })] : []),
    ],
    server: {
      host: isProd ? PROD_HOST : DEV_HOST,
      port: PORT,
      ...(isProd && {
        allowedHosts: [ DOMAIN ],
        hmr: {
          host: DOMAIN,
          protocol: 'wss',
          clientPort: PORT,
        },
        ...(SSL_KEY && SSL_CRT && {
          https: {
            key: SSL_KEY,
            cert: SSL_CRT,
          },
        }),
      }),
    },
    preview: {
      port: PORT,
      allowedHosts: [ DOMAIN ],
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
        format: {
          comments: false,
        },
      },
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            if (id.includes('node_modules')) {

              if (id.includes('react-router-dom') || id.includes('react-router')) {
                return 'react-router';
              };
 
              if (
                id.includes('@reduxjs/toolkit') ||
                id.includes('react-redux')      ||
                id.includes('reselect')
              ) {
                return 'redux';
              };

              if (id.includes('socket.io-client')) {
                return 'socket';
              };

              if (
                id.includes('axios') ||
                id.includes('dayjs') ||
                id.includes('uuid')
              ) {
                return 'utils';
              };

              if (id.includes('@telegram-apps')) {
                return 'telegram-sdk';
              };

              if (id.includes('emoji-mart') || id.includes('@emoji-mart')) {
                return 'emoji';
              };

              if (
                id.includes('react-easy-crop') ||
                id.includes('react-swipeable') ||
                id.includes('react-player')
              ) {
                return "servises";
              }

              return 'vendor';
            }
          }
        }
      }
    },
  }
})
