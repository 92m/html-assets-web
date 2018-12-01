const THREE = require('three')
import { initMixin } from '../../libs/utils/mixin'
import Sea from './components/member/sea'
import Sky from './components/member/sky'
import AirPlane from './components/member/airPlane'
initMixin(THREE)
class THREEAPP {
  constructor(container, ops) {
    this.scene = null
    this.camera = null
    this.renderer = null
    this.controls = null
    this.fieldOfView = null
    this.nearPlane = null
    this.farPlane = null

    this.HEIGHT = ''
    this.WIDTH = ''

    this.container = container
    this.aspectRatio = 1

    this.colors = {
      red: 0xf25346,
      white: 0xd8d0d1,
      brown: 0x59332e,
      pink: 0xf5986e,
      brownDark: 0x23190f,
      blue: 0x68c3c0
    }

    this.sea = null
    this.sky = null
    this.airPlane = null
    this.mousePos = { x: 0, y: 0 }
  }

  initGL() {
    this.createScene()

    this.createLights()

    this.createSea()

    this.createSky()

    this.createPlane()

    // 监听鼠标移动
    document.addEventListener('mousemove', event => this.handleMouseMove(event), false)

    this.loop()
  }

  createScene() {
    this.HEIGHT = window.innerHeight
    this.WIDTH = window.innerWidth

    // 创建场景
    this.scene = new THREE.Scene()

    // 在场景中添加雾的效果；样式上使用和背景一样的颜色
    this.scene.fog = new THREE.Fog(0xf7d9aa, 100, 950)

    // 创建相机参数
    this.aspectRatio = this.WIDTH / this.HEIGHT
    this.fieldOfView = 60
    this.nearPlane = 1
    this.farPlane = 10000

    /**
     * PerspectiveCamera  透视相机
     * @param fieldOfView 视角
     * @param aspectRatio 纵横比
     * @param nearPlane   近平面
     * @param farPlane    远平面
     */
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      this.aspectRatio,
      this.nearPlane,
      this.farPlane
    )

    // 设置相机的位置
    this.camera.position.x = 0
    this.camera.position.z = 200
    this.camera.position.y = 100

    // 创建渲染器
    this.renderer = new THREE.WebGLRenderer({
      // 在 css 中设置背景色透明显示渐变色
      alpha: true,
      // 开启抗锯齿，但这样会降低性能。
      // 不过，由于我们的项目基于低多边形的，那还好 :)
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
    // 半球光就是渐变的光；
    // 第一个参数是天空的颜色，第二个参数是地上的颜色，第三个参数是光源的强度
    const hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 0.9)

    // 方向光是从一个特定的方向的照射
    // 类似太阳，即所有光源是平行的
    // 第一个参数是关系颜色，第二个参数是光源强度
    const shadowLight = new THREE.DirectionalLight(0xffffff, 0.9)

    // 设置光源的方向。
    // 位置不同，方向光作用于物体的面也不同，看到的颜色也不同
    shadowLight.position.set(150, 350, 350)

    const ambientLight = new THREE.AmbientLight(0xdc8874, 0.5)
    // 开启光源投影
    shadowLight.castShadow = true

    // 定义可见域的投射阴影
    shadowLight.shadow.camera.left = -400
    shadowLight.shadow.camera.right = 400
    shadowLight.shadow.camera.top = 400
    shadowLight.shadow.camera.bottom = -400
    shadowLight.shadow.camera.near = 1
    shadowLight.shadow.camera.far = 1000

    // 定义阴影的分辨率；虽然分辨率越高越好，但是需要付出更加昂贵的代价维持高性能的表现。
    shadowLight.shadow.mapSize.width = 2048
    shadowLight.shadow.mapSize.height = 2048

    // 为了使这些光源呈现效果，只需要将它们添加到场景中
    this.scene.add(hemisphereLight)
    this.scene.add(shadowLight)
    this.scene.add(ambientLight)
  }

  createSea() {
    this.sea = new Sea(this.colors)

    // 在场景底部，稍微推挤一下
    this.sea.mesh.position.y = -600

    // 添加大海的网格至场景
    this.scene.add(this.sea.mesh)
  }

  createSky() {
    this.sky = new Sky(this.colors)
    this.sky.mesh.position.y = -400
    this.scene.add(this.sky.mesh)
  }

  createPlane() {
    this.airPlane = new AirPlane(this.colors)
    this.airPlane.mesh.scale.set(0.25, 0.25, 0.25)
    this.airPlane.mesh.position.y = 100
    this.scene.add(this.airPlane.mesh)
  }

  handleWindowResize() {
    // 更新渲染器的高度和宽度以及相机的纵横比
    this.HEIGHT = window.innerHeight
    this.WIDTH = window.innerWidth
    this.renderer.setSize(this.WIDTH, this.HEIGHT)
    this.camera.aspect = this.WIDTH / this.HEIGHT
    this.camera.updateProjectionMatrix()
  }
  handleMouseMove(event) {
    // 这里我把接收到的鼠标位置的值转换成归一化值，在-1与1之间变化
    // 这是x轴的公式:
    const tx = -1 + (event.clientX / this.WIDTH) * 2

    // 对于 y 轴，我们需要一个逆公式
    // 因为 2D 的 y 轴与 3D 的 y 轴方向相反
    const ty = 1 - (event.clientY / this.HEIGHT) * 2
    this.mousePos = { x: tx, y: ty }
  }
  loop() {
    this.sea.mesh.rotation.z += 0.005
    this.sky.mesh.rotation.z += 0.01
    this.sea.moveWaves()

    this.updatePlane()
    this.updateCameraFov()
    this.renderer.render(this.scene, this.camera)

    requestAnimationFrame(() => this.loop())
  }
  updatePlane() {
    // 让我们在x轴上-100至100之间和y轴25至175之间移动飞机
    // 根据鼠标的位置在-1与1之间的范围，我们使用的 normalize 函数实现（如下）
    const targetX = this.normalize(this.mousePos.x, -1, 1, -100, 100)
    const targetY = this.normalize(this.mousePos.y, -1, 1, 25, 175)

    // 更新飞机的位置
    this.airPlane.mesh.position.y += (targetY - this.airPlane.mesh.position.y) * 0.1
    this.airPlane.mesh.rotation.z = (targetY - this.airPlane.mesh.position.y) * 0.0128
    this.airPlane.mesh.rotation.x = (this.airPlane.mesh.position.y - targetY) * 0.0064

    this.airPlane.propeller.rotation.x += 0.3

    // 更新驾驶员头发
    this.airPlane.pilot.updateHairs()
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
