const { filterEntries } = require('../webpack/utils/get-entries')
const { getHtmlPlugins } = require('../webpack/utils/get-html-plugin')
const { createWebpackCompile } = require('../webpack/utils/create-webpack-compile')
const { shouldCreateNewDll } = require('../webpack/utils/should-create-new-dll')
const { shouldCreateMockServer } = require('../webpack/utils/should-create-mock-server')

// 获取默认配置
const config = require('../webpack/config/project.conf')

// 获取dll配置
const dllConfig = require('../webpack/webpack.dll.conf')

// 获取loader
const loaderConfig = require('../webpack/loader/index.config')

// 配置HTML插件
const htmlPlugins = getHtmlPlugins(
  filterEntries(config.htmlEntries),
  filterEntries(config.modernEntries)
)

console.log(htmlPlugins)
