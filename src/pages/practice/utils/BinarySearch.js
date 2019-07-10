export const BinarySearch = function(arr, target) {
  let s = 0
  let e = arr.length - 1
  let m = Math.floor( (e +2) / 2)
  let sortTag = arr[s] <= arr[e]

  while ( m < e && arr[m] !== target) {
    if(arr[m] > target) {
      sortTag && ( e =  m - 1 )
      !sortTag && ( s = m + 1 )
    } else {
      !sortTag && ( e = m - 1 )
      sortTag && ( s = m + 1 )
    }
    m = Math.floor((s + e) / 2)
  }
  if (arr[m] == target) {
    console.log('找到了,位置%s', m);
    return m;
  } else {
    console.log('没找到');
    return -1;
  }
} 