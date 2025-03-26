import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import checker from 'vite-plugin-checker'
import path from 'node:path'

export default defineConfig(
  ({ mode }) => {

    const env = loadEnv(mode, process.cwd(), '')

    const serverDev = {
      host: env.VITE_HOST,
      https: {
        key: env.VITE_SSL_KEY,
        cert: env.VITE_SSL_CERT,
      },
      port: Number( env.VITE_PORT ),
    }

    const serverPreview = {
      host: env.VITE_HOST,
      allowedHosts: [env.VITE_DOMAIN],
      hmr: {
        host: env.VITE_DOMAIN,
        protocol: 'wss',
      },
      port: 4173
    }

    var server = env.VITE_MODE === 'dev' ? serverDev : serverPreview

    return {
      plugins: [
        react(),
        svgr(),
        checker({ typescript: true }),
      ],
      server,
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
                if (id.includes('lodash')) return 'lodash'
                return 'vendor'
              }
            }
          }
        }
      }
    }
  }
)
