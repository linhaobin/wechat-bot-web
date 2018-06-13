import * as React from 'react'
import { Switch } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import LoadableRoute from './components/router/LoadableRoute'

import './App.css'

class App extends React.Component {
  public render() {
    return (
      <Router>
        <Switch>
          <LoadableRoute exact={true} path="/" component={() => import('./containers/sign-in')} />
        </Switch>
      </Router>
    )
  }
}

export default App
