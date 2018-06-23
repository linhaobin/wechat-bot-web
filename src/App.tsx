import * as React from 'react'
import { Router } from '~/router'
import Routes from '~/routes'

import './App.css'

class App extends React.Component {
  public render() {
    return (
      <Router>
        <Routes />
      </Router>
    )
  }
}

export default App
