// 深度优先搜索
export const deepTraversal = function(node, nodeList = []) {
  if (node !== null) {
    const childrens = node.children || []
    for (let i = 0; i <= childrens.length; i++) {
      childrens[i] && childrens[i].className ? nodeList.push(childrens[i]) : ''
      if (childrens[i]) {
        deepTraversal(childrens[i], nodeList)
      }
    }
    return nodeList
  }
}

// 广度优先搜索
export const wideTraversal = function(node) {
  const nodes = []
  if (node !== null) {
    const queue = []
    queue.unshift(node)
    while (queue.length !== 0) {
      const item = queue.shift()
      nodes.push(item)
      const childrens = item.children || []
      for (let i = 0; i < childrens.length; i++) {
        queue.push(childrens[i])
      }
    }
    return nodes
  }
}
