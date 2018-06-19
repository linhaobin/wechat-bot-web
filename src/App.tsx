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
          <LoadableRoute path="/sign-in" component={() => import('./containers/sign-in')} />
          <LoadableRoute path="/" component={() => import('./containers/home')} />
        </Switch>
      </Router>
    )
  }
}

export default App
