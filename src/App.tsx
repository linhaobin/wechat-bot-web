import { Button } from 'antd'
import * as React from 'react'
import { Switch } from 'react-router'
import { BrowserRouter as Router, Link } from 'react-router-dom'

import LoadableRoute from './components/router/LoadableRoute'

import './App.css'

class App extends React.Component {
  public render() {
    return (
      <Router>
        <React.Fragment>
          <ul>
            <ol>
              <Link to="/">
                <Button>Home</Button>
              </Link>
            </ol>
            <ol>
              <Link to="/game">Game</Link>
            </ol>
            <ol>
              <Link to="/product-table">ProductTable</Link>
            </ol>
          </ul>

          <Switch>
            <LoadableRoute exact={true} path="/" component={() => import('./sign-in')} />
            <LoadableRoute path="/home" component={() => import('./containers/home')} />
            <LoadableRoute
              path="/game"
              component={() => import('./containers/game')}
              render={(Component, props) => {
                return <Component />
              }}
            />
            <LoadableRoute
              path="/product-table"
              component={() => import('./containers/filterableProductTable')}
              loading={() => <div>Loading !!!!</div>}
              children={(Component, props) => {
                return <Component />
              }}
            />
          </Switch>
        </React.Fragment>
      </Router>
    )
  }
}

export default App
