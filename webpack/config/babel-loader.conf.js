const os = require('os')
const { resolve } = require('path')
const HappyPack = require('happypack')

const happyThreadPool = HappyPack.ThreadPool({
  size: os.cpus().length
})

const configBabelLoader = browserlist => {
  // 多线程打包
  return new HappyPack({
    id: 'babel', // 上面loader?后面指定的id
    loaders: [
      {
        loader: 'babel-loader',
        options: {
          presets: [
            [
              'env',
              {
                modules: false,
                useBuiltIns: true,
                targets: {
                  browsers: browserlist
                }
              }
            ],
            'stage-2',
            'react'
          ],
          plugins: [
            'syntax-dynamic-import',
            'react-hot-loader/babel',
            [
              'dva-hmr',
              {
                entries: [resolve(process.cwd(), './src/pages/payment/payment.js')]
              }
            ],
            ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }]
          ]
        }
      }
    ], // 实际匹配处理的loader
    threadPool: happyThreadPool,
    verbose: true
  })
}

module.exports = {
  configBabelLoader
}
