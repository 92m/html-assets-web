Function.prototype.band2 = function(context) {
  const self = this
  const argsParent = Array.prototype.slice.call(arguments, 1)
  return function() {
    const args = argsParent.concat(Array.prototype.slice.call(arguments)) //转化成数组
    self.apply(context, args)
  }
}

Function.prototype.call2 = function(context) {
  const context = context || window
  const args = []
  context.fn = this
  for (let i =1 ; i < arguments.length; i++) {
    args.push(`"arguments[${i}]`) //不这么做的话 字符串的引号会被自动去掉 变成了变量 导致报错
  }
  args = args.join(',')

  const result = eval(`context.fn${args}`) //相当于执行了context.fn(arguments[1], arguments[2]);

  delete context.fn 

  return result
}

Function.prototype.apply2 = function(context, arr) {
  const context = context || window
  const params = arr || []
  const args = []
  context.fn = this
  for ( let i = 0; i < params.length; i++ ) {
    args.push(`"arguments[${i}]`) //不这么做的话 字符串的引号会被自动去掉 变成了变量 导致报错
  }
  args = args.join(',')
  
  const result = eval(`context.fn${args}`) //相当于执行了context.fn(arguments[1], arguments[2]);

  delete context.fn 

  return result
}