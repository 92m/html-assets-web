const splitChunksConfig = {
  // react 项目基础包
  'vendor-react': {
    test: /node_modules\/react|node_modules\/react-dom/g,
    name: 'vendor-react',
    chunks: 'all',
    enforce: true,
    priority: 10
  },
  // dva 项目基础包
  'vendor-dva': {
    test: /node_modules\/dva/g,
    name: 'vendor-dva',
    chunks: 'all',
    enforce: true,
    priority: 10
  },
  // 单页面引入 react-router，这里单独分割出来
  'spa-vendor-react': {
    test: /node_modules\/react-router/g,
    name: 'spa-vendor-react',
    chunks: 'all',
    enforce: true,
    priority: 2
  },
  // vue 项目基础包
  'vendor-vue': {
    test: /node_modules\/vue/g,
    name: 'vendor-vue',
    chunks: 'all',
    enforce: true,
    priority: 2
  },
  // 单页面引入 vue-router，这里单独分割出来
  'spa-vendor-vue': {
    test: /node_modules\/vue-router/g,
    name: 'spa-vendor-vue',
    chunks: 'all',
    enforce: true,
    priority: 10
  },
  // 剩余chunk自动分割
  commons: {
    name: 'commons',
    minChunks: 2,
    minSize: 0,
    chunks: 'all',
    enforce: true, // 设置成true，避免入口通过独立分割后，不再复用commons代码，而是将剩余代码包含在业务文件中
    priority: 11
  }
}

// 入口默认加载的chunk
const defaultAssetsConfig = {
  chunks: ['manifest', 'commons']
}

module.exports = {
  splitChunksConfig,
  defaultAssetsConfig
}
