const { defineConfig } = require('@vue/cli-service')
const defaultSettings = require('./src/settings.js')
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin')
const port = 8013
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV == 'production' ? '/componetns-admin/' : '/',
  outputDir: 'dist',
  assetsDir: 'static',
  transpileDependencies: true,
  configureWebpack: {
    name: defaultSettings.title,
    plugins: [
      new MonacoWebpackPlugin(),
      new CompressionPlugin({
        test: /\.(js|css|html)?$/i,
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        minRatio: 0.8
      })
    ],
  },
  devServer: {
    port: port,
    open: true,
    client: {
      overlay: {
        warnings: false,
        errors: false,
      },
      overlay: false,
    },
    proxy: {
      '/api': {
        target: 'https://eladmin.vip',
        changeOrigin: true,
        pathRewrite: {
          '^/api': 'api'
        }
      },
      '/auth': {
        target: 'https://eladmin.vip',
        changeOrigin: true,
        pathRewrite: {
          '^/auth': 'auth'
        }
      },
      '/home': {
        target: 'https://api.52vmy.cn/api',
        changeOrigin: true,
        pathRewrite: {
          '^/home': ''
        }
      },
      '/text': {
        target: 'https://api.nnxv.cn/api',
        changeOrigin: true,
        pathRewrite: {
          '^/text': ''
        }
      },
    },
  },
  chainWebpack(config) {
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')

    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
    config.when(process.env.NODE_ENV !== 'development', config => {
      config
        .optimization.splitChunks({
          chunks: 'all',
          cacheGroups: {
            libs: {
              name: 'chunk-libs',
              test: /[\\/]node_modules[\\/]/,
              priority: 10,
              chunks: 'initial' // only package third parties that are initially dependent
            },
            elementUI: {
              name: 'chunk-elementUI', // split elementUI into a single package
              priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
              test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
            },
            commons: {
              name: 'chunk-commons',
              test: resolve('src/components'), // can customize your rules
              minChunks: 3, //  minimum common number
              priority: 5,
              reuseExistingChunk: true
            }
          }
        })
      config.optimization.runtimeChunk('single')
    }
    )
  }
})
