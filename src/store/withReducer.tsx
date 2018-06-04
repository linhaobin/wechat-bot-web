import { object } from 'prop-types'
import * as React from 'react'
import { Reducer } from 'redux'
import { injectAsyncReducer } from './index'

export const withReducer = <P extends any>(name: string, reducer: Reducer) => (
  WrappedComponent: React.ComponentType<P>
) => {
  const Extended: React.SFC<P> = (props, context) => {
    injectAsyncReducer(context.store, name, reducer)

    return <WrappedComponent {...props} />
  }
  Extended.contextTypes = {
    store: object
  }
  return Extended
}

export default withReducer
