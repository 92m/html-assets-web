/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {boolean}
 */

export const hasPathSum = function(root, sun = 0) {
  if (root === null) return false
  sum -= root.val
  if (root.left == null && root.right == null) {
    return sum == 0
  }
  return hasPathSum(root.left, sum) || hasPathSum(root.right, sum)
}
