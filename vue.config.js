const { defineConfig } = require('@vue/cli-service')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const port = 8013 
console.log('process.env.VUE_BASE_API',process.env.VUE_BASE_API)
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new MonacoWebpackPlugin()
    ]
  },
  devServer: {
    port:port,
    open:true,
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
  }
})
