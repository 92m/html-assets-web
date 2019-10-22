const THREE = require('three')

const CustomSinCurve = THREE.Curve.create(
  function(scale) {
    //custom curve constructor
    this.scale = scale === undefined ? 1 : scale
  },

  function(t) {
    //getPoint: t is between 0-1
    const tx = t * 3 - 1.5,
      ty = Math.sin(2 * Math.PI * t),
      tz = 0

    return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale)
  }
)

class cylinder {
  constructor(colors) {
    this.mesh = null
    this.init(colors)
  }
  init(ops) {
    this.mesh = new THREE.Object3D()

    let path = new CustomSinCurve(20)

    // 创建圆柱体
    const geome = new THREE.TubeGeometry(
      path, // path
      20, // segments
      2, // radius
      8, // radiusSegments
      false // closed
    )

    // 创建圆柱体皮肤
    const material = new THREE.MeshBasicMaterial({ color: 0xcccccc })

    const mesh = new THREE.Mesh(geome, material)

    this.mesh.add(mesh)
  }
}

export default cylinder
