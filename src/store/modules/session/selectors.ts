import { createSelector } from 'reselect'
import { RootState } from '../../index'
import { namespace } from './constant'

export const sessionSelector = (state: RootState) => state[namespace]

export const sessionUserSelector = createSelector(sessionSelector, state => state.user)
