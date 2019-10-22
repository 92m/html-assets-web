export const throttle1 = function(fun, delay) {
  let lastTime = 0
  function throttled() {
    const context = this
    const args = arguments
    const nowTime = new Date().now()
    if (nowTime > lastTime + delay) {
      fun.apply(context, args)
      lastTime = nowTime
    }
  }
  return throttled
}

export const throttle2 = function(fun, delay) {
  const timeout = null
  function throttled() {
    const context = this
    const args = arguments
    if (!timeout) {
      timeout = setTimeout(function() {
        fun.apply(context, args)
        clearTimeout(timeout)
        timeout = null
      }, delay)
    }
  }
}

export const throttle = function(func, wait, options) {
  var timeout, context, args, result
  var previous = 0
  if (!options) options = {}

  var later = function() {
    previous = options.leading === false ? 0 : Date.now() || new Date().getTime()
    timeout = null
    result = func.apply(context, args)
    if (!timeout) context = args = null
  }

  var throttled = function() {
    var now = Date.now() || new Date().getTime()
    if (!previous && options.leading === false) previous = now
    var remaining = wait - (now - previous)
    context = this
    args = arguments
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      result = func.apply(context, args)
      if (!timeout) context = args = null
    } else if (!timeout && options.trailing !== false) {
      // 判断是否设置了定时器和 trailing
      timeout = setTimeout(later, remaining)
    }
    return result
  }

  throttled.cancel = function() {
    clearTimeout(timeout)
    previous = 0
    timeout = context = args = null
  }

  return throttled
}
