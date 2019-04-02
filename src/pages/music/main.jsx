import React from 'react'
import { hot } from 'react-hot-loader'
import { env } from 'utils/config'

import './music.scss'

const App = () => <div id="app">Hello World!!! {env}</div>

export default (env == 'development' ? hot(module)(App) : App)
