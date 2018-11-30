const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const WebpackDevServer = require('webpack-dev-server')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')
const Notifier = require('node-notifier')
const { configBabelLoader } = require('./config/babel-loader.conf')
const { filterEntries } = require('./utils/get-entries')
const { getHtmlPlugins } = require('./utils/get-html-plugin')
const { createWebpackCompile } = require('./utils/create-webpack-compile')
const { shouldCreateNewDll } = require('./utils/should-create-new-dll')
const { shouldCreateMockServer } = require('./utils/should-create-mock-server')

// 获取默认配置
const config = require('./config/project.conf')

// 获取dll配置
const dllConfig = require('./webpack.dll.conf')

// 获取loader
const loaderConfig = require('./loader/index.config')

// 配置HTML插件
const htmlPlugins = getHtmlPlugins(
  filterEntries(config.htmlEntries),
  filterEntries(config.modernEntries)
)

// 配置开发环境webpack.conf
const developmentConfig = webpackMerge(loaderConfig, {
  devtool: '#cheap-module-eval-source-map',
  mode: 'development',
  entry: filterEntries(config.modernEntries),
  output: {
    path: config.outputPath,
    filename: config.development.filename,
    chunkFilename: config.development.chunkFilename,
    publicPath: config.publicPath
  },
  resolve: config.resolve,
  plugins: [
    // 输出es6 chunks
    configBabelLoader([
      'last 2 Chrome versions',
      'not Chrome < 60',
      'last 2 Safari versions',
      'not Safari < 10.1',
      'last 2 iOS versions',
      'not iOS < 10.3',
      'last 2 Firefox versions',
      'not Firefox < 54',
      'last 2 Edge versions',
      'not Edge < 15'
    ]),
    // 开启热更新
    new webpack.HotModuleReplacementPlugin(),

    // 定义环境变量
    new webpack.DefinePlugin(config.globalVar[config.env]),

    // 配置webpack运行报错警告
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [
          `Your application is running here: http://${config.development.host}:${
            config.development.port
          }`
        ]
      },
      onErrors: (serverity, errors) => {
        const error = errors[0]
        const filename =
          error.file &&
          error.file
            .split('!')
            .pop()
            .split('?')
            .shift()
        Notifier.notify({
          title: 'Σ(oﾟдﾟoﾉ)',
          message: serverity + ':' + error.name,
          subtitle: filename || '',
          icon: path.join(process.cwd(), './static/favicon.ico')
        })
      }
    }),

    // html配置
    ...htmlPlugins,

    new HtmlWebpackIncludeAssetsPlugin({
      assets: ['vendor.dll.js'],
      append: false,
      hash: true
    }),

    // 同步构建文件生产至磁盘
    // new WriteFilePlugin(),

    // 拷贝静态文件
    new CopyWebpackPlugin([
      {
        from: config.assetsSubDirectory,
        to: path.resolve(process.cwd(), './dist/static'),
        ignore: ['.*']
      }
    ]),

    // 错误不打断程序
    new webpack.NoEmitOnErrorsPlugin(),

    // 显示进度条
    new ProgressBarPlugin()
  ]
})

// 配置开发环境webpack.sever.conf
const devServerConfig = {
  host: config.development.host,
  port: config.development.port,
  contentBase: [config.outputPath],
  hot: true,
  publicPath: '/',
  // proxy-server
  proxy: config.development.proxy,
  // mock-server
  before: shouldCreateMockServer(),
  inline: true,
  quiet: true,
  stats: {
    colors: true
  }
}
;(async () => {
  // 根据依赖是否变化判断是否需要创建新的dll文件
  if (shouldCreateNewDll()) {
    await createWebpackCompile(dllConfig)
  }

  await new Promise((resolve, reject) => {
    let compiler = null
    let server = null

    WebpackDevServer.addDevServerEntrypoints(developmentConfig, devServerConfig)

    // 创建compile
    compiler = webpack(developmentConfig)

    server = new WebpackDevServer(compiler, devServerConfig)

    server.listen(config.development.port)

    resolve()
  })
})()
