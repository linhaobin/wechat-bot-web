const tsImportPluginFactory = require('ts-import-plugin')

module.exports = function (tsLoader, env) {
  // rewired tsLoader
  tsLoader.options = {
    getCustomTransformers: () => ({
      before: [tsImportPluginFactory({
        libraryDirectory: 'es',
        libraryName: 'antd',
        style: 'css',
      })]
    })
  }

  return tsLoader;
};