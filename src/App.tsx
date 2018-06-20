import * as React from 'react'
import { Switch } from 'react-router'
import { AuthRoute, LoadableRoute, Router } from '~/router'

import './App.css'

class App extends React.Component {
  public render() {
    return (
      <Router>
        <Switch>
          <LoadableRoute path="/sign-in" component={() => import('./containers/sign-in')} />
          <AuthRoute path="/" component={() => import('./containers/home')} />
        </Switch>
      </Router>
    )
  }
}

export default App
