import React from 'react';
import Logo from '../../component/logo/logo';
import { connect } from 'react-redux';
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { login, registerSubmit } from '../../redux/user.redux';
import { Redirect } from 'react-router-dom';
import ImoocForm from '../../component/imooc-form/imooc-form';

// 注意下面装饰器的用法，带参数的和不带参数的，本质上是高阶函数即函数柯里化应用
// const newComponent = connect(mapStateToProps?: function, mapDispatchToProps?: object | function)(ImoocForm(Login)): ReactInstance
// export default newComponent

// 装饰器本质是一个函数，如果带参数的话，意思就是先执行，然后返回一个新函数，该函数再包裹当前组件 otherComponent = fn()(component)
// 如果没有带参数，则直接包裹该组件 otherComponent = fn(component)

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
