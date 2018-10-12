const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const postcssConfig = require('../config/postcss.config')
const config = require('../config/project.conf')

const openSourceMap = config.env !== 'production' ? true : false
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
        exclude: /node_modules/,
        use: [
          config.env === 'development' ? styleLoader : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
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
