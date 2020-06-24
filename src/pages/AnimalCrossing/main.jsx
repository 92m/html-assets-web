import React from 'react'
import moment from 'moment'
import { hot } from 'react-hot-loader'
import { env } from 'utils/config'

import styles from './AnimalCrossing.scss'

class App extends React.Component {
  constructor(props) {
    super(props)

  }

  componentWillMount() {
    
  }

  componentDidMount() {

  }

  start() {
   
  }

  render() {
    return (
      <React.Fragment>
        <div className={styles.left}>

        </div>
        <div className={styles.container}>
          
          <div className={styles.main}>
            <div className={styles.heart}></div>
            <div className={styles.mainBody}>
              <div className={styles.mainLeft}></div>
              <div className={styles.mainConet}></div>
              <div className={styles.mainRight}></div>
            </div>
          </div>
          <div ></div>
        </div>
      </React.Fragment>
    )
  }
}

export default (env == 'development' ? hot(module)(App) : App)
