const path = require('path')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

// env is development or production
module.exports = function (webpackConfig, env) {
  // rewired webpack config
  // use react-app-rewired https://github.com/timarney/react-app-rewired#utilities

  webpackConfig.resolve.alias['~'] = resolve('src')
  // webpackConfig.resolve.alias['@api'] = resolve('src/api')
  // webpackConfig.resolve.alias['@config'] = resolve('src/config')
  // webpackConfig.resolve.alias['@containers'] = resolve('src/containers')
  // webpackConfig.resolve.alias['@components'] = resolve('src/components')
  // webpackConfig.resolve.alias['@model'] = resolve('src/model')
  // webpackConfig.resolve.alias['@store'] = resolve('src/store')

  return webpackConfig;
};