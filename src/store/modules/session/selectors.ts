import { createSelector } from 'reselect'
import { RootState } from '~/store'
import { namespace } from './constants'

export const getSessionState = (state: RootState) => state[namespace]

export const getSession = createSelector(getSessionState, state => state.session)
export const getUser = createSelector(getSessionState, state => state.user)
