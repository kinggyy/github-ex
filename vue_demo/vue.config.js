const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false //关闭语法检测 "lint": "vue-cli-service lint"
})
