const THREE = require('three')

class THREEAPP {
  constructor(element, ops) {
    this.renderer = null
    this.canvas = element
    this.aspectRatio = 1
    this.recalcAspectRatio()

    this.scene = null
    this.cameraDefaults = {
      posCamera: new THREE.Vector3(0.0, 175.0, 500.0),
      posCameraTarget: new THREE.Vector3(0, 0, 0),
      near: 0.1,
      far: 10000,
      fov: 45
    }
    this.camera = null
    this.cameraTarget = this.cameraDefaults.posCameraTarget

    this.controls = null
  }

  initGL() {
    // 初始化渲染
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      autoClear: true
    })
    this.renderer.setClearColor(0x050505)

    // 初始化场景
    this.scene = new THREE.Scene()

    // 初始化相机
    this.camera = new THREE.PerspectiveCamera(
      this.cameraDefaults.fov,
      this.aspectRatio,
      this.cameraDefaults.near,
      this.cameraDefaults.far
    )
    this.resetCamera()
  }

  recalcAspectRatio() {
    this.aspectRatio =
      this.canvas.offsetHeight === 0 ? 1 : this.canvas.offsetWidth / this.canvas.offsetHeight
  }

  resetCamera() {
    this.camera.position.copy(this.cameraDefaults.posCamera)
    this.cameraTarget.copy(this.cameraDefaults.posCameraTarget)

    this.updateCamera()
  }
}
