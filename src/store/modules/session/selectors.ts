import { createSelector } from 'reselect'
import { RootState } from 'src/store'
import { namespace } from './constant'

export const getSessionState = (state: RootState) => state[namespace]

export const getSession = createSelector(getSessionState, state => state.session)
export const getUser = createSelector(getSessionState, state => state.user)
