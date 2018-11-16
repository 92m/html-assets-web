const webpackMerge = require('webpack-merge')
const jsLoader = require('./babel-loader.conf')
const cssLoader = require('./css-loader.conf')
const lessLoader = require('./less-loader.conf')
const sassLoader = require('./sass-loader.conf')
const urlLoader = require('./url-loader.conf')
const vueLoader = require('./vue-loader.conf')

module.exports = webpackMerge(
  {},
  jsLoader,
  cssLoader,
  sassLoader,
  lessLoader,
  urlLoader,
  vueLoader
)
