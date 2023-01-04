const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    allowedHosts: 'all',
  },
  crossorigin: 'anonymous',
  pages: {
    index: {
      entry: 'src/main.ts',
      template: 'public/index.html',
      filename: 'index.html',
    },
    // popup: {
    //   entry: 'src/main.ts',
    //   template: 'public/index.html',
    //   filename: 'popup.html',
    // },
  },
})
