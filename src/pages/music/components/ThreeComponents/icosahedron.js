const THREE = require('three')

class Circle {
  constructor(colors) {
    this.mesh = null
    this.init(colors)
  }

  init(colors) {
    const textureLoader = new THREE.TextureLoader()

    // 创建圆
    const geometry = new THREE.IcosahedronGeometry(10, 4)

    // 创建皮肤材质

    const texture = new THREE.Texture(this.generateTexture())
    texture.wrapS = THREE.MirroredRepeatWrapping
    texture.needsUpdate = true

    const material = new THREE.MeshLambertMaterial({
      map: texture,
      wireframe: true,
      transparent: true
    })

    this.mesh = new THREE.Mesh(geometry, material)
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
