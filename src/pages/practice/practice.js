import { twoSun, firstUniqChar, lengthOfLongestSubstring } from './utils/Leetcode-part-1'
import { deepTraversal, wideTraversal } from './utils/BFS-DFS'
import { top, topK } from './utils/TopK'
// 两数之和

console.log('两数之和-twoSun', twoSun([1, 2, 3, 5, 7], 4))

// 首个重复字符出现位置

console.log('首个重复字符出现位置-firstUniqChar', firstUniqChar('leetcode'))

// 无重复字符的最长子串

console.log('无重复字符的最长子串-lengthOfLongestSubstring', lengthOfLongestSubstring('abcda'))

// 深度优先搜索
console.log('deepTraversal', deepTraversal(document.querySelector('.parent')))

// 广度优先搜索
console.log('wideTraversal', wideTraversal(document.querySelector('.parent')))

// topk
const ret = topK(new Array(16, 22, 91, 0, 51, 44, 23), 3, function(a, b) {
  return a < b
})
console.log(ret)

// 草稿

function Super(age) {
  this.age = age
}

const instance = new Super(24)

console.log('instance.__proto__ === Super.prototype', instance.__proto__ === Super.prototype)
console.log(
  'instance.__proto__.__proto__ === Object.prototype',
  instance.__proto__.__proto__ === Object.prototype
)

function info() {
  console.log(this.age)
}

const one = {
  age: 1,
  info,
  f: function(a) {
    this.a = a
    return (b) => {
      console.log(this.a + b)
    }
  }
}

const _info = one.info

_info.call(one)

one.f(1)(2)
let m = 10
true && (m = m +1)
console.log(m)