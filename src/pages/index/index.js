import THREEAPP from './main'
import WebGL from '../../libs/WebGL'
import 'assets/css/reset.css'
import './index.scss'
;(function() {
  if (WebGL.isWebGLAvailable() === false) {
    document.body.appendChild(getWebGLErrorMessage())
  }

  const app = new THREEAPP(document.getElementById('container'))

  app.initGL()
})()
