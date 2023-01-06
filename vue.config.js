const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production' ? '/TO_REPLACE_HERE/' : '/',
  devServer: {
    allowedHosts: 'all',
  },
})
