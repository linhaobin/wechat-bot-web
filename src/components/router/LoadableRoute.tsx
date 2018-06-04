import * as React from 'react'
import * as Loadable from 'react-loadable'
import { Route, RouteComponentProps, RouteProps } from 'react-router'

export type LoadableRouteProps<Props> = LoadableRoutePropsWithoutRender<Props>
// | LoadableRoutePropsWithRender<Props, Exports>
// | LoadableRoutePropsWithChildren<Props, Exports>

export interface LoadableRouteCommonProps
  extends Omit<RouteProps, 'component' | 'render' | 'children'>,
    PartialWith<Loadable.CommonOptions, 'loading'> {}

export interface LoadableRoutePropsWithoutRender<Props> extends LoadableRouteCommonProps {
  component(): Promise<React.ComponentType<Props> | { default: React.ComponentType<Props> }>
  render?(component: React.ComponentType<Props>, props: RouteComponentProps<any>): React.ReactNode
  children?(component: React.ComponentType<Props>, props: RouteComponentProps<any>): React.ReactNode
}

// export interface LoadableRoutePropsWithRender<Props, Exports extends object> extends LoadableRouteCommonProps {
//   component(): Promise<Exports>
//   render(component: Exports, props: Props & RouteComponentProps<any>): React.ReactNode
// }

// export interface LoadableRoutePropsWithChildren<Props, Exports extends object> extends LoadableRouteCommonProps {
//   component(): Promise<Exports>
//   children(component: Exports, props: Props & RouteComponentProps<any>): React.ReactNode
// }

// type AllProps<Props> = LoadableRoutePropsWithoutRender<Props> &
// LoadableRoutePropsWithRender<Props, any> &
// LoadableRoutePropsWithChildren<Props, any>

export const LoadableRoute = <Props, Exports extends object>(
  props: LoadableRouteProps<Props>
): React.ReactElement<RouteProps> => {
  const { component, render, children, ...rest } = props
  const { loading, delay, timeout, modules, webpack, ...routeProps } = rest

  const loadableOptions: Loadable.Options<Props, Exports> = {
    delay,
    loader: component,
    loading: loading || (() => <div>Loading...</div>),
    modules,
    timeout,
    webpack
  }

  const LoadableRouteComponent = Loadable(loadableOptions)
  // children > render
  if (children || render) {
    const propName = children ? 'children' : 'render'
    const callback = children || render
    ;(routeProps as RouteProps)[propName] = propss => {
      return callback!(LoadableRouteComponent, propss)
    }
  } else {
    ;(routeProps as RouteProps).component = LoadableRouteComponent
  }
  return <Route {...routeProps} />
}

export default LoadableRoute
