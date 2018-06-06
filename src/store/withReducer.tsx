import { object } from 'prop-types'
import * as React from 'react'
import { Reducer, ReducersMapObject } from 'redux'
import { injectAsyncReducer } from './index'

interface WithReducer {
  (reducers: ReducersMapObject): <P>(WrappedComponent: React.ComponentType<P>) => React.SFC<P>
  (name: string, reducer: Reducer): <P>(WrappedComponent: React.ComponentType<P>) => React.SFC<P>
}
export const withReducer: WithReducer = <P extends any>(options: ReducersMapObject | string, reducer?: Reducer) => (
  WrappedComponent: React.ComponentType<P>
) => {
  const Extended: React.SFC<P> = (props, context) => {
    injectAsyncReducer(context.store, options, reducer)

    return <WrappedComponent {...props} />
  }
  Extended.contextTypes = {
    store: object
  }
  return Extended
}

export default withReducer
