const { resolve } = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const postcssConfig = require('../config/postcss.config')
const config = require('../config/project.conf')

const openSourceMap = config.env === 'development' ? true : false
const styleLoader = {
  loader: 'style-loader',
  options: {
    sourceMap: openSourceMap
  }
}

let lessLoaderConfig = {
  module: {
    rules: [
      {
        test: /\.less/,
        use: [
          config.env === 'development' ? styleLoader : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              localIdentName: '[local]-[hash:base64:5]',
              sourceMap: openSourceMap
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: openSourceMap,
              ident: 'postcss',
              plugins: postcssConfig
            }
          },
          {
            loader: 'less-loader',
            options: {
              modifyVars: require(resolve(process.cwd(), './theme.js')),
              javascriptEnabled: true,
              sourceMap: openSourceMap
            }
          }
        ]
      }
    ]
  },
  plugins: []
}

// 打包抽离css
if (config.env !== 'development') {
  lessLoaderConfig.plugins.push(
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash:8].css'
    })
  )
}

module.exports = lessLoaderConfig
