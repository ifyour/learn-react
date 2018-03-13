import React from 'react';
import Logo from '../../component/logo/logo';
import { connect } from 'react-redux';
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { login, registerSubmit } from '../../redux/user.redux';
import { Redirect } from 'react-router-dom';
import ImoocForm from '../../component/imooc-form/imooc-form';

@connect(
    state => state.user,
    { login, registerSubmit }
)
@ImoocForm // Login = ImoocForm(Login) 柯里化函数做装饰器, 上面的 connect 也一样
class Login extends React.Component {
    constructor(props){
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    } 

    handleLogin() {
        this.props.login(this.props.state)
    }

    handleRegister() {
        this.props.registerSubmit();
    }

    render(){
        return (
            <div>
                { this.props.redirectTo && this.props.redirectTo !== '/login' ? <Redirect to={ this.props.redirectTo } /> : null }
                <Logo />
                { this.props.msg ? <p className="err-msg">{ this.props.msg }</p> : null }
                <List>
                    <InputItem onChange={ v => this.props.handleChange('user', v) }>用户名</InputItem>
                    <WhiteSpace />
                    <InputItem type="password" onChange={ v => this.props.handleChange('pwd', v) }>密码</InputItem>
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