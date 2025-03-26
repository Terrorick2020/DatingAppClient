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
      allowedHosts: [env.VITE_DOMAIN],
      hmr: {
        host: env.VITE_DOMAIN,
        protocol: 'wss',
      },
    }

    var server = env.VITE_MODE === 'dev' ? serverDev : serverPreview

    const config = {
      plugins: [
        react(),
        svgr(),
        checker({ typescript: true }),
      ],
      server,
      preview: {
        allowedHosts: [env.VITE_DOMAIN],
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
                return 'vendor'
              }
            }
          }
        }
      }
    }

    console.log( config )

    return { ...config }
  }
)
