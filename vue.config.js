const ScriptSetup = require('unplugin-vue2-script-setup/webpack').default
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const AutoImport = require('unplugin-auto-import/webpack')
const { defineConfig } = require('@vue/cli-service')
const version = require('./package.json').version
const date = new Date().toLocaleString()

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0] = {
        ...args[0],
        title: 'figma-token项目',
        meta: {
          content: `Build time:${date}, Version:${version}`
        }
      }
      return args
    })
  },
  configureWebpack: {
    plugins: [
      // node核心polyfill,解决一些老依赖问题
      new NodePolyfillPlugin(),
      ScriptSetup({
        /* options */
      }),
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/ // .md
        ],
        imports: [
          {
            '@vue/composition-api': [
              'ref',
              'unref',
              'reactive',
              'toRef',
              'toRefs',
              'onMounted',
              'onUnmounted',
              'computed',
              'watch',
              'getCurrentInstance',
              'onBeforeUnmount',
              'nextTick'
            ],
            '@u3u/vue-hooks': ['useRouter', 'useStore']
          }
        ]
      })
    ]
  }
})
