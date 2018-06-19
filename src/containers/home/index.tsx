import * as React from 'react'

// components
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import LoadableRoute from '~/components/router/LoadableRoute'

import logo from '../../logo.svg'

const Home: React.SFC = props => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <p className="App-intro">
        To get started, edit <code>src/App.tsx</code> and save to reload.
      </p>

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
      <LoadableRoute
        path="/game"
        component={() => import('~/containers/game')}
        render={Component => {
          return <Component />
        }}
      />
      <LoadableRoute
        path="/product-table"
        component={() => import('~/containers/filterableProductTable')}
        loading={() => <div>Loading !!!!</div>}
        children={Component => {
          return <Component />
        }}
      />
    </div>
  )
}

export default Home
