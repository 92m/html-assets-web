// 两数之和

export const twoSun = function(nums, target, i = 0, maps = {}) {
  const map = maps
  if (map[target - nums[i]] >= 0) {
    return [map[target - nums[i]], i]
  } else {
    map[nums[i]] = i
    i++
    if (i < nums.length) {
      return twoSun(nums, target, i, map)
    } else {
      console.error('error: twoSum is not find')
    }
  }
}

// 首个重复字符出现位置

export const firstUniqChar = function(s, i = 0) {
  let str = s.split('')
  if (s.indexOf(str[i], i + 1) == -1) {
    return i
  } else {
    if (i < str.length) {
      i++
      return firstUniqChar(s)
    } else {
      return -1
    }
  }
}

// 无重复字符的最长子串

export const lengthOfLongestSubstring = function(s) {
  let num = 0,
    j = 0,
    t = 0
  for (let i = 0; i < s.length; i++) {
    t = s.slice(j, i).indexOf(s[i])
    if (t == -1) {
      num = Math.max(num, i - j + 1)
    } else {
      j = j + t + 1
    }
  }
  return num
}
