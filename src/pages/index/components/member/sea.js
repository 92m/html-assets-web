const THREE = require('three')

class Sea {
  constructor(colors) {
    this.mesh = null
    this.init(colors)
  }
  init(colors) {
    // 创建一个圆柱几何体
    // 参数为：顶面半径，底面半径，高度，半径分段，高度分段
    const geom = new THREE.CylinderGeometry(600,600,800,40,10)

    // 在 x 轴旋转几何体
    geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2))

    // 创建材质
    const mat = new THREE.MeshPhongMaterial({
      color: colors.blue,
      transparent:true,
      opacity:.85,
      flatShading: true,
    })

    // 为了在 Three.js 创建一个物体，我们必须创建网格用来组合几何体和一些材质 
    this.mesh = new THREE.Mesh(geom, mat)

    // 允许大海对象接收阴影
    this.mesh.receiveShadow = true

  }
}

export default Sea 