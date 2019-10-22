const { resolve } = require('path')
const { getEntry } = require('../utils/get-entries')

/* global process */
const env = process.env.NODE_ENV

const config = {
  // 设置当前构建环境的全局常量
  env,

  // 设置HTML入口配置
  htmlEntries: getEntry('./src/pages/**/*.html'),

  // 设置ES6构建入口配置
  modernEntries: getEntry('./src/pages/**/!(*legacy).js'),

  // 设置ES5构建入口配置
  getLegacyEntries: function() {
    return getEntry('./src/pages/**/+(*legacy).js')
  },

  // 设置ES6打包信息配置
  modernFileName: 'script/[name].[chunkhash].js',
  modernChunkFileName: 'script/[name].[chunkhash].chunk.js',

  // 设置ES5打包信息配置
  legacyFileName: 'script/[name].legacy.[chunkhash].js',
  legacyChunkFileName: 'script/[name].legacy.[chunkhash].chunk.js',

  // 设置输出文件夹
  outputPath: resolve(process.cwd(), './dist'),
  publicPath: './',

  // 设置静态资源文件夹
  assetsSubDirectory: resolve(process.cwd(), './static'),

  // 设置开发环境的development变量
  development: {
    host: 'localhost',
    port: 8002,
    hot: true,
    filename: 'script/[name].js',
    chunkFilename: 'script/[name].chunk.js',
    proxy: {
      '/api/**': {
        target: '', // 服务器地址
        changeOrigin: true
      }
    }
  },

  // 设置全局变量
  globalVar: {
    development: {
      __MODE__: JSON.stringify(process.env.ENV)
    },
    test: {
      __MODE__: JSON.stringify(process.env.ENV)
    },
    stage: {
      __MODE__: JSON.stringify(process.env.ENV)
    },
    production: {
      __MODE__: JSON.stringify(process.env.ENV)
    }
  },

  // 配置搜索规则 别名规则
  resolve: {
    extensions: ['.js', '.vue'],
    // 优先搜索src下的公共资源目录
    modules: [
      resolve(process.cwd(), './src/assets'),
      resolve(process.cwd(), './src/libs'),
      resolve(process.cwd(), './src/components'),
      'node_modules'
    ],
    alias: {
      // 公共资源
      assets: resolve(process.cwd(), './src/assets'),
      libs: resolve(process.cwd(), './src/libs'),
      components: resolve(process.cwd(), './src/components'),
      utils: resolve(process.cwd(), './src/utils')
    }
  }
}
module.exports = config
