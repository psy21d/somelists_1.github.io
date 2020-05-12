/* eslint-disable */
const IgnoreNotFoundExportPlugin = require('./src/lib/webpack/IgnoreNotFoundExports')

module.exports = {
  runtimeCompiler: true,
  chainWebpack: (config) => {
    config.module
      .rule('i18n')
      .resourceQuery(/blockType=i18n/)
      .type('javascript/auto')
      .use('i18n')
      .loader('@intlify/vue-i18n-loader')

    config
      .plugin("IgnoreNotFoundExportPlugin")
      .before("friendly-errors")
      .use(IgnoreNotFoundExportPlugin);
  }
}
