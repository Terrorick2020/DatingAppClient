import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
  ],
  server: {
    https: {
      // key: './ssl/selfsigned.key',
      // cert: './ssl/selfsigned.crt',
      key: './ssl/key.pem',
      cert: './ssl/cert.pem',
    },
    host: '0.0.0.0',
    port: 5173,
  },
  // server: {
  //   host: '0.0.0.0',
  //   allowedHosts: ['cyberslavs.fun'],
  //   hmr: {
  //     host: 'cyberslavs.fun',
  //     protocol: 'wss',
  //   },
  // },
  // preview: {
  //   allowedHosts: ['cyberslavs.fun']
  // },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'react';
            if (id.includes('lodash')) return 'lodash';
            return 'vendor';
          }
        }
      }
    }
  },
})
