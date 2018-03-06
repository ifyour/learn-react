import React from 'react';
import Logo from '../../component/logo/logo';
import {
    List,
    InputItem,
    WingBlank,
    WhiteSpace,
    Button
} from 'antd-mobile'

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user: '',
            pwd: '',
            type: 'genius'
        }
        this.register = this.register.bind(this);
    } 

    register() {
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
                <Logo />
                <List>
                    <InputItem onChange={ v => this.handleChange('user', v) }>用户名</InputItem>
                    <WhiteSpace />
                    <InputItem onChange={ v => this.handleChange('pwd', v) }>密码</InputItem>
                </List>
                <WhiteSpace />
                <WingBlank>
                    <Button type="primary">登录</Button>
                    <WhiteSpace />
                    <Button type="primary" onClick={ this.register }>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Login;