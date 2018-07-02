// import { createSelector } from 'reselect'
import { RootState } from '~/store'
import { namespace } from './constants'

export const getWechatListState = (state: RootState) => state[namespace]
