/**
 * 全局配置
 * api 请求地址
 * env 环境变量
 */

/**
 * 全局环境变量
 * 由 webpack 打包构建提供
 * 值目前为 development、test、stage、production
 */
const env = __MODE__

/**
 * 全局登录cookie超时, 单位天
 */
const loginTimeout = 1

/**
 * 统一配置cookie name
 */

const cookies = {
  auth: 'global_auth_sys',
  identity: 'global_user_name',
  accountId: 'global_account_id',
  tenantId: 'global_tenant_id',
  resourceId: 'global_resource_id',
  accessId: 'global_access_id',
  orgId: 'global_org_id',
  personId: 'global_person_id'
}

/**
 * 后端服务请求地址 map

 */
const api = {}

/**
 * 环境判断 map
 * development  开发环境
 * test         测试环境
 * stage        预发布环境
 * production   生产环境
 */
const envMap = {
  development: {},
  test: {},
  stage: {},
  production: {}
}

Object.assign(api, envMap[env])

module.exports = { env, api, loginTimeout, cookies }
