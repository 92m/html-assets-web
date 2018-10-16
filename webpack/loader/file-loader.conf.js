const path = require('path')

const fileLoaderConfig = {
  module: {
    rules: [
      {
        test: /\.(3ds|mtl|obj|skp)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
        exclude: path.resolve(process.cwd(), './src'),
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]'
            }
          }
        ]
      }
    ]
  }
}

module.exports = fileLoaderConfig
