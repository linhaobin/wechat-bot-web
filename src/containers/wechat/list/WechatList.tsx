import * as React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router'

// model
import { Wechat, WechatStatus } from '~/model'

// components
import { Button, Divider, Table } from 'antd'
import LoginDialog from './LoginDialog'

// store
import { bindActionCreators, compose, Dispatch } from 'redux'
import { RootState, withReducer } from '~/store'
import * as actions from './store/actions'
import reducers from './store/reducers'
import * as selectors from './store/selectors'

const mapStateToProps = (state: RootState) => {
  return {
    ...selectors.getWechatListState(state)
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    openLoginDialog: bindActionCreators(actions.openLoginDialog, dispatch),
    loadTableData: bindActionCreators(actions.loadTableData, dispatch),
    closeLoginDialog: bindActionCreators(actions.closeLoginDialog, dispatch),
    restart: bindActionCreators(actions.restart, dispatch)
  }
}

interface Props extends RouteComponentProps<any>, ReturnType<typeof mapStateToProps> {
  openLoginDialog: actions.DispatchOpenLoginDialog
  closeLoginDialog: actions.DispatchCloseLoginDialog
  loadTableData: actions.DispatchLoadTableData
  restart: actions.DispatchRestart
}

class WechatList extends React.PureComponent<Props> {
  public componentDidMount() {
    this.props.loadTableData()
  }

  public render() {
    const { openLoginDialog } = this.props

    return (
      <div>
        <Button type="primary" onClick={openLoginDialog}>
          登录
        </Button>

        {this.renderTable()}

        {this.renderLoginDialog()}
      </div>
    )
  }

  /**
   * render table
   */
  private renderTable() {
    const { table, restart } = this.props

    const columns = [
      {
        title: '昵称',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'ID',
        dataIndex: 'wechatUserId',
        key: 'wechatUserId'
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (status: WechatStatus, record: Wechat) =>
          status === WechatStatus.Login ? <span>已登录</span> : <span>未登录</span>
      },
      {
        title: '操作',
        key: 'action',
        render: (_: any, record: Wechat) => (
          <span>
            <a
              href="javascript:;"
              onClick={() => {
                restart({ wechatUserId: record.wechatUserId })
              }}
            >
              重新登录
            </a>
            {record.status === WechatStatus.Login && (
              <React.Fragment>
                <Divider type="vertical" />
                <a href="javascript:;">登出</a>
              </React.Fragment>
            )}
          </span>
        )
      }
    ]
    return <Table columns={columns} dataSource={table.list} loading={table.loading} rowKey="_id" />
  }

  /**
   * render login dialog
   */
  private renderLoginDialog() {
    const { loginDialog, closeLoginDialog } = this.props

    return <LoginDialog {...loginDialog} onClose={closeLoginDialog} />
  }
}

export default compose(
  withReducer(reducers),
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(WechatList)
