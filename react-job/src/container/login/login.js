import React from 'react';
import Logo from '../../component/logo/logo';
import { connect } from 'react-redux';
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { login } from '../../redux/user.redux';
import { Redirect } from 'react-router-dom';

@connect(
    state => state.user,
    { login }
)
class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user: '',
            pwd: ''
        }
        this.handleRegister = this.handleRegister.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    } 

    handleLogin() {
        this.props.login(this.state)
    }

    handleRegister() {
        this.props.history.push('/register')
    }

    handleChange(key, value) {
        this.setState({
            [key]: value
        })
    }

    render(){
        return (
            <div>
                { this.props.redirectTo ? <Redirect to={ this.props.redirectTo } /> : null }
                <Logo />
                { this.props.msg ? <p className="err-msg">{ this.props.msg }</p> : null }
                <List>
                    <InputItem onChange={ v => this.handleChange('user', v) }>用户名</InputItem>
                    <WhiteSpace />
                    <InputItem type="password" onChange={ v => this.handleChange('pwd', v) }>密码</InputItem>
                </List>
                <WhiteSpace />
                <WingBlank>
                    <Button type="primary" onClick={ this.handleLogin }>登录</Button>
                    <WhiteSpace />
                    <Button type="primary" onClick={ this.handleRegister }>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Login;