import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import checker from 'vite-plugin-checker';
import path from 'node:path';

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    checker({ typescript: true }),
  ],
  esbuild: {
    drop: ['console', 'debugger'],
  },
  server: {
    host: '0.0.0.0',
    allowedHosts: ['3dating.fun'],
    hmr: {
      host: '3dating.fun',
      protocol: 'wss',
    },
  },
  preview: {
    allowedHosts: ['3dating.fun']
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules')) {
            if (id.includes('lodash')) return 'lodash'
            return 'vendor';
          }
        }
      }
    }
  },
})