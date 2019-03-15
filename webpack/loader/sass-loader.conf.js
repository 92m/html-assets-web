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

let sassLoaderConfig = {
  module: {
    rules: [
      {
        test: /\.scss/,
        exclude: /node_modules/,
        use: [
          config.env === 'development' ? styleLoader : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              import: true,
              modules: true,
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
            loader: 'sass-loader',
            options: {
              outputStyle: 'expanded',
              sourceMap: openSourceMap
            }
          },
          {
            // 配置全局scss 不需要@import来引入scss文件就可使用mixin.scss中的全局变量与mixin
            loader: 'sass-resources-loader',
            options: {
              sourceMap: openSourceMap,
              resources: [
                resolve(process.cwd(), './src/assets/scss/mixin.scss'),
                resolve(process.cwd(), './src/assets/scss/svg.scss'),
                resolve(process.cwd(), './src/assets/scss/antd-global.scss')
              ]
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
  sassLoaderConfig.plugins.push(
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash:8].css'
    })
  )
}

module.exports = sassLoaderConfig
