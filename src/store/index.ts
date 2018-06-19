export { default as configureStore, RootState } from './configureStore'
export * from './asyncReduces'

import configureStore from './configureStore'

export const { store, persistor } = configureStore({})

export default store
