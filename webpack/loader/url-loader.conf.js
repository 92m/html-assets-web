const urlLoaderConfig = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)(\?\S*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'images/[name].[hash:7].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'fonts/[name].[hash].[ext]'
            }
          }
        ]
      }
    ]
  }
}

module.exports = urlLoaderConfig
