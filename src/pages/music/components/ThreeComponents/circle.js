const THREE = require('three')

class Circle {
  constructor(colors) {
    this.mesh = null
    this.init(colors)
  }

  init(colors) {
    this.mesh = new THREE.Object3D()
    // 创建圆环1
    const geome1 = new THREE.CircleGeometry(12, 80)

    // 创建皮肤1
    const material1 = new THREE.MeshBasicMaterial({
      color: 0x59b9f9,
      opacity: 0.8,
      transparent: true
    })
    const mesh1 = new THREE.Mesh(geome1, material1)

    this.mesh.add(mesh1)

    // 创建圆环2
    const geome2 = new THREE.CircleGeometry(11, 80)

    // 创建皮肤2
    const material2 = new THREE.MeshBasicMaterial({
      color: 0x2cd7f5,
      opacity: 0.7,
      transparent: true
    })
    const mesh2 = new THREE.Mesh(geome2, material2)

    this.mesh.add(mesh2)
  }

  generateTexture() {
    const canvas = document.createElement('canvas')
    canvas.width = 255
    canvas.height = 255

    const context = canvas.getContext('2d')
    const image = context.getImageData(0, 0, canvas.width, canvas.height)

    let x = 0,
      y = 0

    for (let i = 0, j = 0, l = image.data.length; i < l; i += 4, j++) {
      x = j % 255
      y = x == 0 ? y + 1 : y

      image.data[i] = 255
      image.data[i + 1] = 255
      image.data[i + 2] = 255
      image.data[i + 3] = Math.floor(x ^ y)
    }

    context.putImageData(image, 0, 0)
    // 测试皮肤
    // document.getElementsByTagName('body')[0].appendChild(canvas)

    return canvas
  }
}

export default Circle
