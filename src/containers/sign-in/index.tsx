import { Button, Form, Icon, Input } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
const FormItem = Form.Item
import * as React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router'
import { bindActionCreators, compose, Dispatch } from 'redux'

import { RootState } from '~/store'
import * as sessionActions from '~/store/modules/session/actions'
import { ActionTypes } from '~/store/modules/session/constant'
import * as sessionSelectors from '~/store/modules/session/selectors'

import './styles.css'
interface Props extends FormComponentProps, RouteComponentProps<any> {
  inProgress: boolean
  actions: { signIn: sessionActions.DispatchSignIn }
}

class NormalLoginForm extends React.Component<Props> {
  public handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (err) {
        // alert(`Received values of form: ${values}`)
        return
      }

      const action = await this.props.actions.signIn(values)

      if (action.type === ActionTypes.SIGN_IN_FAIL) {
        // tslint:disable-next-line
        console.info('登录失败', action.payload)
        return
      }

      this.props.history.push('/')
    })
  }

  public render() {
    const { getFieldDecorator } = this.props.form

    return (
      <div className="login">
        <Form className="login-form" onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入帐号' }]
            })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="帐号" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码' }]
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="密码"
              />
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button" loading={this.props.inProgress}>
              登录
            </Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    inProgress: sessionSelectors.getSessionState(state).signInInProgress
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    actions: bindActionCreators({ signIn: sessionActions.signIn }, dispatch)
  }
}

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Form.create()(NormalLoginForm))
