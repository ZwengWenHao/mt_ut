const { defineConfig } = require('@vue/cli-service')
const defaultSettings = require('./src/settings.js')
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const port = 8013
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    name:defaultSettings.title,
    plugins: [
      new MonacoWebpackPlugin()
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
      }
    },
  },
  chainWebpack(config) {
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
  }
})
