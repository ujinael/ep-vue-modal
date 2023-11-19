import { fileURLToPath, URL } from 'node:url'
import dts from 'vite-plugin-dts'
import vue from '@vitejs/plugin-vue'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { defineConfig } from 'vite'
const components = {
  EPModalContainer: 'src/components/EPModalContainer/EPModalContainer.vue',
  plugin: 'src/components/plugin/index.ts',
  composable: 'src/components/composable/index.ts',
  types: 'src/components/types/index.ts'
}
// https://vitejs.dev/config/
export default defineConfig((env) => {
  return {
    plugins: [
      vue(),
      dts({
        entryRoot: './src/components',
        insertTypesEntry: true,
        cleanVueFileName: true
      }),
      cssInjectedByJsPlugin({ relativeCSSInjection: true }),
      viteStaticCopy({
        targets: [
          {
            src: 'src/components/index.js',
            dest: '',
            transform: (contents) => contents.toString().replace(/.vue/g, '')
          },
          {
            src: 'src/components/index.js',
            dest: '',
            rename: 'index.d.ts',
            transform: (contents) => contents.toString().replace(/.vue/g, '')
          },
          {
            src: 'src/assets/index.css',
            dest: ''
          },
          {
            src: 'src/assets/transitions.css',
            dest: ''
          }
        ]
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    build: {
      target: 'esnext',
      cssCodeSplit: true,
      lib: {
        entry: components,
        formats: ['es'],
        name: 'ep-vue-modal',
        fileName: 'ep-vue-modal'
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          entryFileNames: (info) => {
            if (info.facadeModuleId?.includes('.vue')) {
              return `[name]/[name].js`
            }
            return `[name]/index.js`
          },
          assetFileNames: '[name]/[name].[ext]',
          globals: {
            vue: 'Vue'
          }
        }
      }
    }
  }
})
