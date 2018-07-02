import rootReducer from '../src/store/rootReducer'

import { RootState as LayoutState } from '~/containers/layout/store/reducers'
import { RootState as WechatListState } from '~/containers/wechat/list/store/reducers'

declare module '~/store' {
  export type RootState = ReturnType<ReturnType<typeof rootReducer>> & LayoutState & WechatListState
}
