import * as React from 'react'

// components
import { Button, Icon, Layout as AntdLayout, Menu } from 'antd'
import { Switch } from 'react-router'
import { LoadableRoute } from '~/router'

// store
import { connect } from 'react-redux'
import { bindActionCreators, compose, Dispatch } from 'redux'
import { RootState, withReducer } from '~/store'

import * as socketActions from '~/socket/store/actions'
import * as sessionActions from '~/store/modules/session/actions'

import * as actions from './store/actions'
import reducers from './store/reducers'
import * as selectors from './store/selectors'

// styles
import './Layout.css'

const mapStateToProps = (state: RootState) => ({
  menu: selectors.getSessionMenu(state)
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(
    {
      collapse: actions.collapse,
      signOut: sessionActions.signOut,
      connectAndLogin: socketActions.connectAndLogin
    },
    dispatch
  )
})

type Props = ReturnType<typeof mapStateToProps> & {
  actions: {
    collapse: actions.DispatchCollapse
    signOut: sessionActions.DispatchSignOut
    connectAndLogin: socketActions.DispatchConnectAndLogin
  }
}

class Layout extends React.PureComponent<Props> {
  public onCollapse = (collapsed: boolean) => {
    this.props.actions.collapse({ collapsed })
  }

  public componentWillMount() {
    this.props.actions.connectAndLogin()
  }

  public render() {
    const { menu } = this.props
    return (
      <AntdLayout>
        {/* 顶部 */}
        <AntdLayout.Header className="layout_header">
          <Button icon="logout" onClick={this.props.actions.signOut} />
        </AntdLayout.Header>

        <AntdLayout>
          {/* 左侧 */}
          <AntdLayout.Sider
            className="layout_main-menu"
            theme="light"
            collapsible={true}
            collapsed={menu.collapsed}
            onCollapse={this.onCollapse}
          >
            {/* 菜单 */}
            <Menu style={{ borderRight: 'none' }}>
              <Menu.Item key="1">
                <Icon type="user" />
                <span>nav 1</span>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="video-camera" />
                <span>nav 2</span>
              </Menu.Item>
              <Menu.Item key="3">
                <Icon type="upload" />
                <span>nav 3</span>
              </Menu.Item>
            </Menu>
          </AntdLayout.Sider>
          {/* 内容 */}
          <AntdLayout.Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            <Switch>
              <LoadableRoute component={() => import('~/containers/wechat/list/WechatList')} />
            </Switch>
          </AntdLayout.Content>
        </AntdLayout>
      </AntdLayout>
    )
  }
}

export default compose(
  withReducer(reducers),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Layout)
