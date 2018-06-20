import * as React from 'react'
import { connect } from 'react-redux'
import { Redirect, RouteComponentProps } from 'react-router'
import { RootState } from '~/store'
import * as sessionSelectors from '~/store/modules/session/selectors'
import LoadableRoute, { LoadableRouteProps } from './LoadableRoute'

const mapStateToProps = (state: RootState) => {
  return {
    session: sessionSelectors.getSessionState(state).session
  }
}
type AuthRouteCommonProps = ReturnType<typeof mapStateToProps>
// export type AuthRoutePropsWithRoute = AuthRouteCommonProps &
//   RequiredWith<Omit<RouteProps, 'render' | 'children'>, 'component'>
// export type AuthRoutePropsWithLoadableRoute<Props> = AuthRouteCommonProps & LoadableRouteProps<Props>
// export type AuthRouteProps<Props> = AuthRoutePropsWithRoute | AuthRoutePropsWithLoadableRoute<Props>
type ComponentType<Props> = React.ComponentType<Props> | { default: React.ComponentType<Props> }
export interface AuthRouteProps<Props> extends Omit<LoadableRouteProps<Props>, 'component'>, AuthRouteCommonProps {
  component: ComponentType<Props> | (() => Promise<ComponentType<Props>>)
}

const AuthRoute = <Props extends any>(props: AuthRouteProps<Props>): React.ReactElement<Props> => {
  const { session, component, ...rest } = props

  return (
    <LoadableRoute
      {...rest}
      component={async () => {
        // todo
        const isSignIn = !!session

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

export default connect(mapStateToProps)(AuthRoute)

// function isLoadableRouteProps<Props>(props: AuthRouteProps<Props>): props is AuthRoutePropsWithLoadableRoute<Props> {
//   return typeof props.component === 'function'
// }
