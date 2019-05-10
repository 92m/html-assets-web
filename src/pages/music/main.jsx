import React from 'react'
import ThreeContainer from './components/ThreeContainer.jsx'
import { hot } from 'react-hot-loader'
import { env } from 'utils/config'

import styles from './music.scss'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      info: '',
      fileName: ''
    }
    this.audioContext = null
    this.file = null
    this.animationId = null
    this.source = null
    this.status = 0 // 声音标志正在播放1或停止0
    this.audio = React.createRef()
    this.fileInput = React.createRef()
  }

  componentWillMount() {
    this.prepareAPI()
  }

  componentDidMount() {
    this.fileInput.current.addEventListener('change', e => {
      const target = e.target
      if (target.files.length !== 0) {
        this.file = target.files[0]
        const { name } = this.file
        this.start()
      }
    })
  }

  start() {
    const fr = new FileReader()

    fr.addEventListener(
      'load',
      e => {
        const fileResult = e.target.result

        if (this.audioContext === null) return false

        this.audioContext.decodeAudioData(
          fileResult,
          buffer => {
            this.visualize(buffer)
          },
          e => {
            console.error(e)
          }
        )
      },
      false
    )

    fr.addEventListener(
      'error',
      e => {
        console.error(e)
      },
      false
    )

    fr.readAsArrayBuffer(this.file)
  }
  visualize(buffer) {
    const audioBufferSouceNode = this.audioContext.createBufferSource()
    const analyser = this.audioContext.createAnalyser()

    // 将音源链接到分析仪
    audioBufferSouceNode.connect(analyser)
    // 将分析仪连接到目的地（扬声器），否则将听不到声音
    analyser.connect(this.audioContext.destination)
    // 将缓冲区分配给缓冲区源节点
    audioBufferSouceNode.buffer = buffer
    // 准备播放
    if (!audioBufferSouceNode.start) {
      audioBufferSouceNode.start = audioBufferSouceNode.noteOn //in old browsers use noteOn method
      audioBufferSouceNode.stop = audioBufferSouceNode.noteOff //in old browsers use noteOff method
    }
    // 如果当前有音频在播放则停止播放之前的音频
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId)
    }
    if (this.source !== null) {
      this.source.stop(0)
    }

    audioBufferSouceNode.addEventListener(
      'statechange',
      e => {
        this.audioStatechange(e)
      },
      false
    )

    audioBufferSouceNode.addEventListener(
      'ended',
      e => {
        this.audioEnd(e)
      },
      false
    )

    // 开始播放
    audioBufferSouceNode.start(0)
    this.status = 1
    this.source = audioBufferSouceNode

    this.drawSpectrum(analyser)
  }
  drawSpectrum(analyser) {
    var array = new Uint8Array(analyser.frequencyBinCount)
    analyser.getByteFrequencyData(array)
  }
  audioStatechange(e) {
    console.log('audioStatechange', e)
  }
  audioEnd(e) {
    this.status = 0
    console.log('audioEnd', this.status)
  }
  prepareAPI() {
    window.AudioContext =
      window.AudioContext ||
      window.webkitAudioContext ||
      window.mozAudioContext ||
      window.msAudioContext
    window.requestAnimationFrame =
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame
    window.cancelAnimationFrame =
      window.cancelAnimationFrame ||
      window.webkitCancelAnimationFrame ||
      window.mozCancelAnimationFrame ||
      window.msCancelAnimationFrame
    try {
      this.audioContext = new AudioContext()
    } catch (e) {
      this.updateInfo('Your browser does not support AudioContext!')
      console.log(e)
    }
  }
  updateInfo(info) {
    this.setState({
      info
    })
  }
  render() {
    const { info, fileName } = this.state
    return (
      <React.Fragment>
        {info == '' ? (
          <div id="app">
            <ThreeContainer />
            <div id="content" className={styles[`content`]}>
              <label className={styles[`file`]}>
                Choose an audio file
                <input
                  type="file"
                  ref={this.fileInput}
                  className={styles[`thefile`]}
                  accept="audio/*"
                />
              </label>
              <audio ref={this.audio} controls />
            </div>
          </div>
        ) : (
          <span>{info}</span>
        )}
      </React.Fragment>
    )
  }
}

export default (env == 'development' ? hot(module)(App) : App)
