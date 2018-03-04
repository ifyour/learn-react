import React from 'react'
import { Redirect } from 'react-router-dom'

import { connect } from 'react-redux';
import { login  } from './Auth.redux';


// react-redux 把 state 和 对应的 redux 中的 action 全部混合成 props 传入组件
@connect(
    // state -> props
    state => state.auth,
    // action
    { login }
)
class Auth extends React.Component {
    render() {
        return (
           <div>
                { this.props.isAuth ? <Redirect to="/dashboard"></Redirect> : null }
                <h2>无权限, 请登录</h2>
                <button onClick={ this.props.login }>登录!</button>
           </div>
        )
    }
}

export default Auth