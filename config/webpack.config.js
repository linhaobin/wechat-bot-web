const path = require('path')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

// env is development or production
module.exports = function (webpackConfig, env) {
  // rewired webpack config
  // use react-app-rewired https://github.com/timarney/react-app-rewired#utilities

  webpackConfig.resolve.alias['src'] = resolve('src')

  return webpackConfig;
};