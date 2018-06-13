export { default as configureStore, RootState } from './configureStore'
export * from './asyncReduces'
import configureStore from './configureStore'

const { store, persistor } = configureStore()
export default store

export { persistor, store }
