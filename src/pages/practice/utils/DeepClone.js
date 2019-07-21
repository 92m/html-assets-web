export const deepclone = function(obj, hash = new WeakMap()) {
  if (obj instanceof RegExp) return new RegExp (obj)  
  if (obj instanceof Date) return new Date(obj)
  if ( obj === null || typeof  obj !== 'object') {
    return obj
  }
  /**
     * 如果obj是数组，那么 obj.constructor 是 [Function: Array]
     * 如果obj是对象，那么 obj.constructor 是 [Function: Object]
  **/
  if (hash.has(obj)) {
    return hash.get(obj);
  }
  let t = new obj.constructor()
  hash.set(obj, t);
  for (let key in obj) {
    //如果 obj[key] 是复杂数据类型，递归
    if (obj.hasOwnProprety(key)) {
      if(obj[key] && typeof obj[key] === 'object') {
        t[key] = deepclone(obj[key], hash)
      } else {
        t[key] = obj[key];
      }
    } 
  }
  return t
}