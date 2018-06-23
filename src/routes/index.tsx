import * as React from 'react'
import { Switch } from 'react-router'
import { AuthRoute, LoadableRoute } from '~/router'

class Routes extends React.Component {
  public render() {
    return (
      <Switch>
        <LoadableRoute path="/sign-in" component={() => import('~/containers/sign-in')} />
        <AuthRoute path="/" component={() => import('~/containers/layout')} />
      </Switch>
    )
  }
}

export default Routes
