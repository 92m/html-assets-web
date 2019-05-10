import React from 'react'
import Three from '../three'
import Main from '../../index/main'
import styles from './ThreeContainer.scss'
import WebGL from '../../../libs/WebGL'
class ThreeContainer extends React.Component {
  constructor(props) {
    super(props)
    this.Three = null
  }

  componentDidMount() {
    if (WebGL.isWebGLAvailable() === false) {
      document.body.appendChild(WebGL.getWebGLErrorMessage())
    }

    this.Three = new Three(document.getElementById('three-container'))

    this.Three.initGL()
  }

  render() {
    return <div id="three-container" className={styles['three-container']} />
  }
}

export default ThreeContainer
