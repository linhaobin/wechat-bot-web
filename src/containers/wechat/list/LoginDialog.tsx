import * as React from 'react'

import { Button, Modal } from 'antd'
import * as QRCode from 'qrcode.react'

export interface Props {
  visible: boolean
  loading: boolean
  qrcode?: string
  onClose: () => void
}
class LoginDialog extends React.PureComponent<Props> {
  public render() {
    const { loading, qrcode, visible } = this.props

    return (
      <Modal visible={visible} width={300} closable={false} footer={this.renderFoot()}>
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', paddingTop: 20 }}>
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
            {(() => {
              if (loading || !qrcode) {
                return <span>loading...</span>
              }

              // TODO: error handle

              return <QRCode value={qrcode} size={200} />
            })()}
          </div>
          <div style={{ fontSize: 14, marginTop: 20 }}>扫描二维码登录</div>
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
