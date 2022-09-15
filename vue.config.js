const path = require('path')

module.exports = {
  outputDir: './build',
  //方式一：直接通过CLI提供给我们的选项来配置：
  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       views: '@/views'
  //     }
  //   }
  // }
  //方式二：通过configureWebpack修改webpack的配置：
  // configureWebpack: (config) => {
  //   config.resolve.alias = {
  //     '@': path.resolve(__dirname, 'src'),
  //     views: '@/views'
  //   }
  // },
  //方式三：通过chainWebpack修改webpack的配置
  chainWebpack: (config) => {
    config.resolve.alias.set('@', path.resolve(__dirname, 'src')).set('views', '@/views')
  }
}
