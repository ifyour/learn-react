import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { List, Button, InputItem, Radio, WingBlank, WhiteSpace } from 'antd-mobile';

import { register } from '../../redux/user.redux';
import Logo from '../../component/logo/logo';
import ImoocForm from '../../component/imooc-form/imooc-form';

@connect (
    state => state.user,
    { register }
)
@ImoocForm
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
    } 

    componentDidMount() {
        this.props.handleChange('type', 'genius')
    }

    handleRegister() {
        this.props.register(this.props.state);
    }

    render(){
        const RadioItem = Radio.RadioItem;
        return (
            <div>
                { this.props.redirectTo && this.props.redirectTo !== '/register' ? <Redirect to={ this.props.redirectTo } /> : null }
                <Logo />
                <List>
                    { this.props.msg ? <p className="err-msg">{ this.props.msg }</p> : null }
                    <InputItem onChange={ v => this.props.handleChange('user', v) }>用户名</InputItem>
                    <InputItem 
                        onChange={ v => this.props.handleChange('pwd', v) }
                        type="password"
                    >密码</InputItem>
                    <InputItem 
                        onChange={ v => this.props.handleChange('repeatpwd', v) }
                        type="password"
                    >确认密码</InputItem>
                    <WhiteSpace />
                    <WhiteSpace />

                    <RadioItem 
                        checked={ this.props.state.type === 'genius' }
                        onClick={ () => this.props.handleChange('type', 'genius') }
                    >牛人</RadioItem>
                    <RadioItem 
                        checked={ this.props.state.type === 'boss' }
                        onClick={ () => this.props.handleChange('type', 'boss') }
                    >BOSS</RadioItem>
                    
                    <WhiteSpace />
                    <WingBlank>
                        <Button type="primary" onClick={ this.handleRegister }>注册</Button>
                    </WingBlank>
                </List>
            </div>
        )
    }
}

export default Register;