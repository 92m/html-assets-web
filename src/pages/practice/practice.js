import { twoSun, firstUniqChar, lengthOfLongestSubstring } from './utils/Leetcode-part-1'
import { deepTraversal, wideTraversal } from './utils/BFS-DFS'
import { top, topK } from './utils/TopK'
import { BinarySearch } from './utils/BinarySearch'
import './practice.scss'
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

// 二分查找
const arrBinarySearch = [88, 77, 66, 55, 44, 33, 22, 11]
const BinarySearchRes = BinarySearch(arrBinarySearch, 88)

// 草稿

// 原型继承
function Super(age) {
  this.age = age
}
Super.prototype.getAge = function() {
  return this.age
}

function SupType(name) {
  this.name = name
}
SupType.prototype = new Super(23)

SupType.prototype.getName = function() {
  return this.name
}
SupType.prototype.constructor = Super

const instance = new SupType('T')
const instance1 = new SupType('T2')
console.log(instance.getAge())
console.log(instance.getName())
console.log(instance1.getName())

// 借用构造函数

function Animal(type, age) {
  this.type
  this.age
}

function Dog(type, age, name) {
  Animal.call(this, type, age)
}

const dahuang = new Dog('Dog', 23, 'dahuang')
const xiaohuang = new Dog('Dog', 10, 'xiaohuang')

// 原型式继承
function object(o) {
  function F() {}
  F.prototype = o
  return new F()
}

const xiaomao = object({
  age: 10,
  type: 'cat',
  getName: function() {
    console.log(this.age)
  }
})

xiaomao.getName()

// 寄生组合式继承

function inheritPrototype(subType, superType) {
  const prototype = object(superType.prototype)
  prototype.constructor = subType
  subType.prototype = prototype
}

function Animal2(type) {
  this.type = type
}

Animal2.prototype.getName = function() {
  console.log(this.name)
}

function Dog2(type, name, age) {
  Animal2.call(this, type)
  this.name = name
  this.age = age
}

inheritPrototype(Dog2, Animal2)

const xiaolan = new Dog2('dog2', 'xiaolan', 20)

xiaolan.getName()

if ([] == false) {
  console.log('[] == false')
}

if ({} == false) {
  console.log('{} == false')
}

if ([]) {
  console.log('[]')
}

function fn(){

  for(var i = 0;i<5;i++){

    (function(i){
      setTimeout(function(){

        console.log(i)
         
      },0);
    })(i)

  }
}

fn()