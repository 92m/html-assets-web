const THREE = require('three')
import Circle from './components/ThreeComponents/circle'
import Icosahedron from './components/ThreeComponents/icosahedron'
import { initMixin } from '../../libs/utils/mixin'

initMixin(THREE)

class THREEAPP {
  constructor(container, ops) {
    this.scene = null
    this.camera = null
    this.renderer = null
    this.controls = null

    this.WIDTH = 0
    this.HEIGHT = 0
    this.container = container

    this.aspectRatio = 1
    this.nearPlane = null
    this.farPlane = null
    this.fieldOfView = null

    this.circle = null
    this.icosahedron = null

    this.colors = {
      red: 0xf25346,
      white: 0xd8d0d1,
      brown: 0x59332e,
      pink: 0xf5986e,
      brownDark: 0x23190f,
      blue: 0x68c3c0
    }
  }

  initGL() {
    this.createScene()
    this.createLights()
    this.createCircle()
    this.createIcosahedron()
    this.loop()
    // this.scene.add(new THREE.CameraHelper(this.camera))
  }

  createScene() {
    this.HEIGHT = window.innerHeight
    this.WIDTH = window.innerWidth

    // 创建场景
    this.scene = new THREE.Scene()

    // 在场景中添加雾的效果；样式上使用和背景一样的颜色

    /**
     * Fog(a, b, c)参数
     * @param a 雾的颜色
     * @param b 雾化开始的距离相机的位置
     * @param c 全雾化距离相机的位置
     */

    this.scene.fog = new THREE.Fog(0xffffff, 1, 950)

    // 创建相机
    this.aspectRatio = this.WIDTH / this.HEIGHT
    this.fieldOfView = 60
    this.nearPlane = 1
    this.farPlane = 10000

    /**
     * 这里添加了一个比例，如果相机的宽度个高度的比例和渲染的比例对不上，最后渲染出来就会变形
     */
    const acspet = window.innerWidth / window.innerHeight
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 200)
    this.camera.position.set(0, 0, 100)
    this.camera.lookAt(this.scene.position)

    // 创建渲染器
    this.renderer = new THREE.WebGLRenderer({
      // 在 css 中设置背景色透明显示渐变色
      alpha: true,
      // 开启抗锯齿，但这样会降低性能。
      antialias: true
    })

    // 定义渲染器的尺寸 在这里它会填满整个屏幕
    this.renderer.setSize(this.WIDTH, this.HEIGHT)

    // 打开渲染器的阴影地图
    this.renderer.shadowMap.enabled = true

    // 在HTML创建的容器中添加渲染器的 DOM 元素
    this.container.appendChild(this.renderer.domElement)

    // 监听屏幕，缩放屏幕更新相机和渲染器的尺寸
    window.addEventListener(
      'resize',
      () => {
        this.handleWindowResize()
      },
      false
    )
  }

  createLights() {
    const ambient = new THREE.AmbientLight(0xffffff)
    this.scene.add(ambient)
    const light = new THREE.DirectionalLight(0xffffff)
    light.position.set(0, 20, 20)

    light.castShadow = true
    light.shadow.camera.top = 10
    light.shadow.camera.bottom = -10
    light.shadow.camera.left = -10
    light.shadow.camera.right = 10

    this.scene.add(light)
  }

  createCircle() {
    this.circle = new Circle()
    this.circle.mesh.position.x = 0
    this.circle.mesh.position.y = 0
    this.scene.add(this.circle.mesh)
  }

  createIcosahedron() {
    this.icosahedron = new Icosahedron()
    this.icosahedron.mesh.position.x = 0
    this.icosahedron.mesh.position.y = 0
    this.scene.add(this.icosahedron.mesh)
  }

  handleWindowResize() {
    // 更新渲染器的高度和宽度以及相机的纵横比
    this.HEIGHT = window.innerHeight
    this.WIDTH = window.innerWidth
    this.renderer.setSize(this.WIDTH, this.HEIGHT)
    this.camera.aspect = this.WIDTH / this.HEIGHT
    this.camera.updateProjectionMatrix()
    console.log(`update matrix: ${this.WIDTH}*${this.HEIGHT}`)
  }

  loop() {
    this.renderer.render(this.scene, this.camera)

    requestAnimationFrame(() => this.loop())
  }

  updateCameraFov() {
    // 更新摄像机位置
    this.camera.fov = this.normalize(this.mousePos.x, -1, 1, 40, 80)
    this.camera.updateProjectionMatrix()
  }

  normalize(v, vmin, vmax, tmin, tmax) {
    const nv = Math.max(Math.min(v, vmax), vmin)
    const dv = vmax - vmin
    const pc = (nv - vmin) / dv
    const dt = tmax - tmin
    const tv = tmin + pc * dt
    return tv
  }
}

export default THREEAPP
