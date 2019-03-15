import React from 'react'
import { hot } from 'react-hot-loader'
import { env } from 'utils/config'
import './demo.scss'

const App = () => <div className="bg">Hello World!!!</div>

export default (env == 'development' ? hot(module)(App) : App)
