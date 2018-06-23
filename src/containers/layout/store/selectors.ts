import { createSelector } from 'reselect'
import { RootState } from '~/store'
import { getSession } from '~/store/modules/session/selectors'
import { namespace } from './constants'
import { Menu } from './reducers'

const DEFAULT_MENU: Menu = {
  collapsed: false
}

export const getLayoutState = (state: RootState) => state[namespace]

export const getSessionMenu = createSelector(getLayoutState, getSession, (state, session) => {
  if (!session) return DEFAULT_MENU
  if (!state.menus[session.userId]) return DEFAULT_MENU
  return state.menus[session.userId]
})
