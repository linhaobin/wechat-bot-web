import { Store } from 'redux'
import configureStore, { State } from './configureStore'
export * from './asyncReduces'
export { withReducer } from './withReducer'

import { RootState as LayoutRootState } from '~/containers/layout/store/reducers'

export const { store, persistor } = configureStore({})

export type RootState = State & LayoutRootState

export { configureStore }

export default store as Store<RootState>

// type ReducersState<T extends ReducersMapObject> = { [key in keyof T]: ReturnType<T[key]> }
