import { ActionCreator, AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { action } from 'typesafe-actions'
import { RootState } from '~/store'
import { getSession } from '~/store/modules/session/selectors'
import { ActionTypes } from './constants'

/**
 * collapse
 */
export const collapseAction = (data: { userId: string; collapsed: boolean }) => action(ActionTypes.COLLAPSE, data)

export interface CollapseParams {
  collapsed: boolean
}
export type DispatchCollapse = (params: CollapseParams) => void
export const collapse: ActionCreator<ThunkAction<void, RootState, undefined, AnyAction>> = (
  params: CollapseParams
) => async (dispatch, getState) => {
  const state = getState()
  const session = getSession(state)

  if (!session) return

  dispatch(
    collapseAction({
      userId: session.userId,
      collapsed: params.collapsed
    })
  )
}
