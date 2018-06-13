export { default as configureStore, RootState } from './configureStore'
export * from './asyncReduces'

import createHistory from 'history/createBrowserHistory'
import configureStore from './configureStore'

export const history = createHistory()

export const { store, persistor } = configureStore({}, history)
export default store

// export { history, persistor, store }
