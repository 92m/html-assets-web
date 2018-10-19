const THREE = require('three')
import OBJLoader from './utils/loaders/OBJLoader'
import OBJLoader2 from './utils/loaders/OBJLoader2'
import TDSLoader from './utils/loaders/TDSLoader'
import MTLLoader from './utils/loaders/MTLLoader'
import LoaderSupport from './utils/loaders/LoaderSupport'
import TrackballControls from './utils/controls/TrackballControls'
import WebGL from '../../libs/WebGL'
import 'assets/css/reset.css'
import './index.scss'
import './assets'
;(function() {
  if (WebGL.isWebGLAvailable() === false) {
    document.body.appendChild(getWebGLErrorMessage())
  }

  let container, controls
  let camera, scene, renderer

  init()
  animate()

  function init() {
    container = document.createElement('div')
    document.querySelector('#canvas-frame').appendChild(container)

    OBJLoader(THREE)
    TDSLoader(THREE)
    MTLLoader(THREE)
    LoaderSupport(THREE)
    OBJLoader2(THREE)
    TrackballControls(THREE)

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 10)
    camera.position.z = 2

    controls = new THREE.TrackballControls(camera)

    scene = new THREE.Scene()
    scene.add(new THREE.HemisphereLight())

    const directionalLight = new THREE.DirectionalLight(0xffeedd)
    directionalLight.position.set(0, 0, 2)
    scene.add(directionalLight)

    //3ds files dont store normal maps
    // var loader = new THREE.TextureLoader()
    // var normal = loader.load('source/models/3ds/portalgun/textures/normal.jpg')

    // var loader = new THREE.TDSLoader()
    // loader.setResourcePath('source/models/3ds/portalgun/textures/')
    // loader.load('source/models/3ds/portalgun/portalgun.3ds', function(object) {
    //   object.traverse(function(child) {
    //     if (child instanceof THREE.Mesh) {
    //       child.material.normalMap = normal
    //     }
    //   })
    //   scene.add(object)
    // })
    var modelName = 'tricycle'

    var objLoader = new THREE.OBJLoader2()
    var callbackOnLoad = function(event) {
      scene.add(event.detail.loaderRootNode)
    }

    var onLoadMtl = function(materials) {
      objLoader.setModelName(modelName)
      objLoader.setMaterials(materials)
      objLoader.setLogging(true, true)
      objLoader.load(
        'source/models/obj/Rudgetricycle/Rudgetricycle.obj',
        callbackOnLoad,
        null,
        null,
        null,
        false
      )
    }
    objLoader.loadMtl('source/models/obj/Rudgetricycle/Rudgetricycle.mtl', null, onLoadMtl)

    renderer = new THREE.WebGLRenderer()
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    container.appendChild(renderer.domElement)

    window.addEventListener('resize', resize, false)
  }

  function resize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight)
  }

  function animate() {
    controls.update()
    renderer.render(scene, camera)

    requestAnimationFrame(animate)
  }
})()
