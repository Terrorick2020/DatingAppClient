import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig, loadEnv } from 'vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import { VitePWA } from 'vite-plugin-pwa'

import react from '@vitejs/plugin-react'
import path from 'node:path'
import checker from 'vite-plugin-checker'
import preload from 'vite-plugin-preload'
import svgr from 'vite-plugin-svgr'

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '')

	const PROD_HOST = env.VITE_PROD_HOST
	const DEV_HOST = env.VITE_DEV_HOST
	const MODE = env.VITE_MODE
	const DOMAIN = env.VITE_DOMAIN
	const SSL_KEY = env.VITE_SSL_KEY
	const SSL_CRT = env.VITE_SSL_CRT
	const PORT = Number(env.VITE_PORT)

	if (!PROD_HOST || !DEV_HOST || !MODE || !DOMAIN || isNaN(PORT))
		throw new Error('Hasn`t some environments in vite.config.ts')

	const isProd = MODE === 'prod'
	const isAnalyze = MODE === 'analyze'

	const allowedHosts = [DOMAIN, 'client']

	return {
		plugins: [
			react(),
			svgr(),
			preload(),
			VitePWA({
				disable: !isProd,
				selfDestroying: true,
				registerType: 'autoUpdate',
				srcDir: 'src',
				workbox: {
					globPatterns: ['**/*.{html,css,js,png,jpg,svg,ico}'],
					maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
					runtimeCaching: [
						{
							urlPattern: ({ request }) => request.mode === 'navigate',
							handler: 'NetworkFirst',
							options: {
								cacheName: 'html-cache',
							},
						},
						{
							urlPattern: /\/api\/helpers\/.*$/,
							handler: 'NetworkFirst',
							options: {
								cacheName: 'api-cache',
								expiration: {
									maxEntries: 50,
									maxAgeSeconds: 6 * 60 * 60,
								},
							},
						},
						{
							urlPattern: /.*\.(?:png|jpg|jpeg|svg|gif|webp|avif)$/,
							handler: 'CacheFirst',
							options: {
								cacheName: 'image-cache',
								expiration: {
									maxEntries: 100,
									maxAgeSeconds: 7 * 24 * 60 * 60,
								},
							},
						},
					],
				},
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
			...(isAnalyze
				? [
						visualizer({
							filename: './dist/stats.html',
							title: 'Vite Bundle Analysis',
							open: true,
							template: 'treemap',
							gzipSize: true,
							brotliSize: true,
						}),
					]
				: []),
		] as any,
		server: {
			host: isProd ? PROD_HOST : DEV_HOST,
			port: PORT,
			...(isProd
				? {
						allowedHosts,
						...(SSL_KEY &&
							SSL_CRT && {
								https: {
									key: SSL_KEY,
									cert: SSL_CRT,
								},
							}),
					}
				: {
						hmr: {
							host: DEV_HOST,
							protocol: 'ws',
							clientPort: PORT,
						},
					}),
		},
		preview: {
			port: PORT,
			allowedHosts,
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
					pure_funcs: ['console.log', 'debug'],
					// Не удаляем неиспользуемые переменные и функции
					unused: false,
					dead_code: false,
				},
				format: {
					comments: false,
				},
				// Сохраняем имена экспортов
				mangle: {
					reserved: ['ALLOWED_VIDEO_TYPES', 'MAX_VIDEO_SIZE'],
					properties: {
						reserved: ['ALLOWED_VIDEO_TYPES'],
					},
				},
				// Сохраняем все экспорты
				keep_classnames: false,
				keep_fnames: false,
			},
			// Убеждаемся, что все экспорты сохраняются
			rollupOptions: {
				output: {
					// Сохраняем имена экспортов
					preserveModules: false,
					// Не удаляем неиспользуемые экспорты
					exports: 'named',
				},
				// Убеждаемся, что файл с константами не удаляется при tree-shaking
				external: [],
				treeshake: {
					// Не удаляем неиспользуемые экспорты из файлов с константами
					moduleSideEffects: id => {
						// Файлы с константами должны сохранять все экспорты
						if (id.includes('/constant/') || id.includes('\\constant\\')) {
							return true
						}
						return false
					},
				},
			},
		},
	}
})
