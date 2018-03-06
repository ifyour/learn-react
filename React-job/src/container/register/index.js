import React from 'react';
import Logo from '../../component/logo/logo';
import {
    List,
    Button,
    InputItem,
    Radio,
    WingBlank,
    WhiteSpace
} from 'antd-mobile';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            pwd: '',
            repeatpwd: '',
            type: 'genius'
        }
        this.handleRegister = this.handleRegister.bind(this);
    } 

    handleChange(key, value) {
        this.setState({
            [key]: value
        })
    }

    handleRegister() {
        console.log(this.state)
    }

    render(){
        const RadioItem = Radio.RadioItem;
        return (
            <div>
                <Logo />
                <List>
                    <InputItem onChange={ v => this.handleChange('user', v) }>用户名</InputItem>
                    <InputItem 
                        onChange={ v => this.handleChange('pwd', v) }
                        type="password"
                    >密码</InputItem>
                    <InputItem 
                        onChange={ v => this.handleChange('repeatpwd', v) }
                        type="password"
                    >确认密码</InputItem>
                    <WhiteSpace />
                    <WhiteSpace />

                    <RadioItem 
                        checked={ this.state.type === 'genius' }
                        onClick={ () => this.handleChange('type', 'genius') }
                    >牛人</RadioItem>
                    <RadioItem 
                        checked={ this.state.type === 'boss' }
                        onClick={ () => this.handleChange('type', 'boss') }
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