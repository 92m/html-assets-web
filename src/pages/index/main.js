const THREE = require('three')
import { initMixin } from './utils/mixin'

initMixin(THREE)

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
    this.controls = new THREE.TrackballControls(this.camera, this.renderer.domElement)

    const path = 'textures/cube/skybox/'
    const urls = [
      path + 'px.jpg',
      path + 'nx.jpg',
      path + 'py.jpg',
      path + 'ny.jpg',
      path + 'pz.jpg',
      path + 'nz.jpg'
    ]

    const textureCube = new THREE.CubeTextureLoader().load(urls)

    this.scene.background = textureCube
  }

  resizeDisplayGL() {
    this.controls.handleResize()

    this.recalcAspectRatio()
    this.renderer.setSize(this.canvas.offsetWidth, this.canvas.offsetHeight, false)

    this.updateCamera()
  }

  initContent() {}

  recalcAspectRatio() {
    this.aspectRatio =
      this.canvas.offsetHeight === 0 ? 1 : this.canvas.offsetWidth / this.canvas.offsetHeight
  }

  resetCamera() {
    this.camera.position.copy(this.cameraDefaults.posCamera)
    this.cameraTarget.copy(this.cameraDefaults.posCameraTarget)

    this.updateCamera()
  }

  updateCamera() {
    this.camera.aspect = this.aspectRatio
    this.camera.lookAt(this.cameraTarget)
    this.camera.updateProjectionMatrix()
  }
}

export default THREEAPP
