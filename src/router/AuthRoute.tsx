import * as React from 'react'
import { connect } from 'react-redux'
import { Redirect, RouteComponentProps } from 'react-router'
import { bindActionCreators, Dispatch } from 'redux'
import { RootState } from '~/store'
import * as sessionActions from '~/store/modules/session/actions'
import LoadableRoute, { LoadableRouteProps } from './LoadableRoute'

const mapStateToProps = (state: RootState) => {
  return {}
}
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    checkLogin: bindActionCreators(sessionActions.checkLogin, dispatch)
  }
}
type ComponentType<Props> = React.ComponentType<Props> | { default: React.ComponentType<Props> }
export interface AuthRouteProps<Props> extends Omit<LoadableRouteProps<Props>, 'component'> {
  component: ComponentType<Props> | (() => Promise<ComponentType<Props>>)
}

interface ConnectAuthRouteProps<Props> extends AuthRouteProps<Props> {
  checkLogin: sessionActions.DispatchGetUser
}

type AuthRouteType = <Props extends any>(props: AuthRouteProps<Props>) => React.ReactElement<Props>
type ConnectAuthRouteType = <Props extends any>(props: ConnectAuthRouteProps<Props>) => React.ReactElement<Props>
const AuthRoute: ConnectAuthRouteType = props => {
  const { component, ...rest } = props
  const { checkLogin } = props

  return (
    <LoadableRoute
      {...rest}
      component={async () => {
        const isSignIn = await checkLogin()

        if (isSignIn) {
          if (typeof component === 'function') {
            return (component as (() => Promise<ComponentType<any>>))()
          }
          return component
        }
        const redirect: React.SFC<RouteComponentProps<{}>> = renderProps => (
          <Redirect
            to={{
              pathname: '/sign-in',
              state: { from: renderProps.location }
            }}
          />
        )
        return redirect
      }}
      render={(Component, p) => {
        return <Component {...p} />
      }}
    />
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthRoute as AuthRouteType)
