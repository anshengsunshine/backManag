const path = require("path")
const AutoImport = require("unplugin-auto-import/webpack")
const Components = require("unplugin-vue-components/webpack")
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers")
const IconsResolver = require("unplugin-icons/resolver")
const Icons = require("unplugin-icons/webpack")

module.exports = {
  publicPath: "./",
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        views: "@/views"
      }
    },
    //配置webpack自动按需引入element-plus，
    plugins: [
      AutoImport({
        resolvers: [
          ElementPlusResolver(),
          // 自动导入图标组件
          IconsResolver({
            prefix: "Icon"
          })
        ]
      }),
      Components({
        resolvers: [
          ElementPlusResolver(),
          // 自动注册图标组件
          IconsResolver({
            enabledCollections: ["ep"]
          })
        ]
      }),
      Icons({
        autoInstall: true
      })
    ]
  },
  devServer: {
    proxy: {
      "^/api": {
        target: "http://152.136.185.210:5000", //http://123.207.32.32:8000/
        pathRewrite: {
          "^/api": ""
        },
        changeOrigin: true
      }
    }
  }
}
