import { Button, Form, Icon, Input } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
const FormItem = Form.Item
import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { RootState } from 'src/store'
import * as sessionActions from 'src/store/modules/session/actions'
import * as sessionSelectors from 'src/store/modules/session/selectors'
import './styles.css'

interface Props extends FormComponentProps {
  inProgress: boolean
  actions: { signIn: typeof sessionActions.signIn }
}

class NormalLoginForm extends React.Component<Props> {
  public handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (err) {
        // alert(`Received values of form: ${values}`)
        return
      }

      this.props.actions.signIn(values)
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
    inProgress: sessionSelectors.sessionSelector(state).signInInProgress
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    actions: bindActionCreators({ signIn: sessionActions.signIn }, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(NormalLoginForm))
