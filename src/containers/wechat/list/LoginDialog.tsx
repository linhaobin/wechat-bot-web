import * as React from 'react'

import { Button, Modal } from 'antd'
import * as QRCode from 'qrcode.react'

export interface Props {
  visible: boolean
  status: number
  qrcode?: string
  onClose: () => void
}
class LoginDialog extends React.PureComponent<Props> {
  public render() {
    const { status, qrcode, visible } = this.props

    return (
      <Modal visible={visible} width={300} closable={false} footer={this.renderFoot()}>
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', paddingTop: 20 }}>
          {(() => {
            if (status === -1 || status === 0) {
              return (
                <React.Fragment>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 200,
                      height: 200,
                      background: '#EEE'
                    }}
                  >
                    {status === -1 || !qrcode ? <span>loading...</span> : <QRCode value={qrcode} size={200} />}
                  </div>
                  <div style={{ fontSize: 14, marginTop: 20 }}>扫描二维码登录</div>
                </React.Fragment>
              )
            } else if (status === 1) {
              return (
                <div>
                  <div>扫码成功</div>
                  <div>请在手机微信中点击登录</div>
                </div>
              )
            } else if (status === 2) {
              return <div>正在登录</div>
            }

            return <div />

            // TODO: error handle
          })()}
        </div>
      </Modal>
    )
  }
  private handleClose = () => {
    this.props.onClose()
  }

  private renderFoot() {
    return (
      <div style={{ textAlign: 'center' }}>
        <Button onClick={this.handleClose}>关闭</Button>
      </div>
    )
  }
}

export default LoginDialog
