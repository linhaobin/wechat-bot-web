import { Reducer } from 'redux'
import { PersistConfig, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { ActionType } from 'typesafe-actions'

import * as actions from './actions'
import { ActionTypes, namespace } from './constants'

const persistConfig: PersistConfig = {
  key: 'menus',
  storage,
  whitelist: ['menus']
}

export interface Menu {
  collapsed: boolean
}
export interface LayoutState {
  menus: {
    [userId: string]: Menu
  }
}

const initialState: LayoutState = {
  menus: {}
}

const reducer: Reducer<LayoutState, ActionType<typeof actions.collapseAction>> = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.COLLAPSE:
      const { userId, collapsed } = action.payload
      return {
        menus: {
          ...state.menus,
          [userId]: {
            ...state.menus[userId],
            collapsed
          }
        }
      }

    default:
      return state
  }
}

export default {
  [namespace]: persistReducer(persistConfig, reducer)
}
export interface RootState {
  [namespace]: LayoutState
}
