/***
 *  本地储存类
 *  参数 preId     本地储存前缀
 *  参数 timeSign  时间戳与储存类之间的拼接符
 ***/
class BaseLocalStorage {
  constructor(preId, timeSign) {
    this.preId = preId
    this.timeSign = timeSign

    this.status = {
      SUCCESS: 0, // 成功
      FAILURE: 1, // 失败
      OVERFLOW: 2, // 溢出
      TIMEOUT: 3 // 过期
    }

    this.storage = localStorage || window.localStorage
  }
  // 获取本地储存数据真实字段
  getKey(key) {
    return this.preId + key
  }
  // 添加（修改）数据
  set(key, value, callback, time) {
    /***
     *  添加（修改）数据
     *  参数 key      数据字段标识
     *  参数 value    数据值
     *  参数 callback 回调函数
     *  参数 time     添加时间
     ***/
    // 默认返回状态
    let status = this.status.SUCCESS
    // 获取key
    const namekey = this.getKey(key)
    try {
      // 参数时间参数时获取时间戳
      time = new Date(time).getTime() || time.getTime()
    } catch (e) {
      // 未传入时间参数或者参数有误 默认时间 一个月
      time = new Date().getTime() + 1000 * 60 * 60 * 24 * 31
    }
    try {
      // 向数据储存中添加数据
      this.storage.setItem(namekey, time + this.timeSign + value)
    } catch (e) {
      // 溢出失败 返回溢出状态
      status = this.status.OVERFLOW
    }
    // 执行回调 并传入参数（状态， 真实数据字段标识， 储存数据值）
    callback && callback.call(this, status, namekey, value)
  }
  // 获取数据
  get(key, callback) {
    /***
     *  获取数据
     *  参数 key      数据字段标识
     *  参数 callback 回调函数
     ***/

    // 默认返回状态
    let status = this.status.SUCCESS
    // 时间戳与储存数据之间拼接符起始位置 时间戳 最终获取数据
    let index, tiem, result
    // 默认获取值
    let value = null
    // 获取key
    const namekey = this.getKey(key)
    // 时间戳与储存数据之间的拼接符长度
    const timeSignLen = this.timeSign.length
    // 缓存当前对象
    const that = this

    try {
      // 获取字段对应的字符串
      value = that.storage.getItem(namekey)
    } catch (e) {
      // 获取失败则返回失败状态 数据结果为null
      result = {
        status: that.status.FAILURE,
        value: null
      }
      // 执行回调并返回
      callback && callback.call(this, result.status, result.value)
      return result
    }
    if (value) {
      // 获取时间戳与储存数据之间的拼接符长度
      index = value.indexOf(that.timeSign)
      // 获取时间戳
      tiem = +value.slice(0, index)
      // 判断是否过期
      if (new Date(tiem).getTime() > new Date().getTime() || tiem == 0) {
        // 未过期 获取数据结果（拼接后面的字符串）
        value = value.slice(index + timeSignLen)
      } else {
        // 已过期则结果为null 状态为过期
        value = null
        status = that.status.TIMEOUT
        that.remove(key)
      }
    } else {
      // 未获取数据字段状态设置失败
      status = this.status.FAILURE
    }
    // 设置结果
    result = {
      status,
      value
    }
    // 执行回调并返回
    callback && callback.call(that, result.status, result.value)
    // 返回结果
    return result
  }
  // 删除数据
  remove(key, callback) {
    /***
     *  删除数据
     *  参数 key      数据字段标识
     *  参数 callback 回调函数
     ***/

    // 默认返回状态
    let status = this.status.FAILURE
    // 默认获取值
    let value = null
    // 获取key
    const namekey = this.getKey(key)

    try {
      // 获取字段对应的数据
      value = this.storage.getItem(namekey)
    } catch (e) {}

    // 数据存在状况
    if (value) {
      try {
        // 删除数据
        this.storage.removeItem(namekey)
        // 设置状态
        status = this.status.SUCCESS
      } catch (e) {}
    }
    // 执行回调
    callback &&
      callback.call(
        this,
        status,
        status > 0 ? null : value.slice(value.indexOf(this.timeSign) + this.timeSign.length)
      )
  }
}

module.exports = BaseLocalStorage
