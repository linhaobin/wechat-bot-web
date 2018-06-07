import { createSelector } from 'reselect'
import { RootState } from 'src/store'
import { namespace } from './constant'

export const sessionSelector = (state: RootState) => state[namespace]

export const userSelector = createSelector(sessionSelector, state => state.user)
