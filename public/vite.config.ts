import path from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { VantResolver } from '@vant/auto-import-resolver'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig, loadEnv } from 'vite'

const rootDir = fileURLToPath(new URL('.', import.meta.url))

/**
 * 创建 Vite 构建配置。
 * @param mode 当前运行环境。
 * @returns 适用于移动端 H5 项目的完整构建配置。
 */
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      vue(),
      UnoCSS(),
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia'],
        dts: 'src/types/auto-imports.d.ts',
        resolvers: [VantResolver()],
        vueTemplate: true,
      }),
      Components({
        dts: 'src/types/components.d.ts',
        dirs: ['src/components'],
        extensions: ['vue'],
        resolvers: [VantResolver()],
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '~': path.resolve(rootDir, 'src'),
      },
    },
    server: {
      host: '0.0.0.0',
      port: Number(env.VITE_PORT || 5173),
      open: false,
    },
    build: {
      target: 'es2018',
      sourcemap: mode !== 'production',
      cssCodeSplit: true,
      chunkSizeWarningLimit: 900,
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            if (id.includes('node_modules/vue') || id.includes('node_modules/pinia') || id.includes('node_modules/vue-router')) {
              return 'vue'
            }
            if (id.includes('node_modules/vant')) {
              return 'vant'
            }
            if (id.includes('node_modules/axios') || id.includes('node_modules/dayjs') || id.includes('node_modules/lodash-es')) {
              return 'vendor'
            }
            return undefined
          },
        },
      },
    },
  }
})
