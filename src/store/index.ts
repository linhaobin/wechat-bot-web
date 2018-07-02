import { Store } from 'redux'
import configureStore from './configureStore'

export * from './asyncReduces'
export { withReducer } from './withReducer'
export const { store, persistor } = configureStore({})

// export type RootState = State & LayoutState & WechatListState

export { configureStore }

export default store as Store<RootState>

// type ReducersState<T extends ReducersMapObject> = { [key in keyof T]: ReturnType<T[key]> }
