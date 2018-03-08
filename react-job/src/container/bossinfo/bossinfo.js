import React from 'react';
import { NavBar, Icon, InputItem, TextareaItem, Button, WingBlank, WhiteSpace } from 'antd-mobile';
import AvatarSelector from '../../component/avatar-selector/avatar-selector';
class BossInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            avatar: '',
            title: '',
            company: '',
            money: '',
            description: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.avatarSelector = this.avatarSelector.bind(this);
    }
    handleChange(key, value) {
        this.setState({
            [key]: value
        })
    }

    avatarSelector(imgName) {
        this.setState({
            avatar: imgName
        })
    }

    render() {
        return (
            <div>
                <NavBar mode="dark">BOSS 完善信息页面</NavBar>
                <AvatarSelector avatarSelector={this.avatarSelector} />
                <WhiteSpace />
                <InputItem onChange={v => this.handleChange('title', v)}>招聘职位</InputItem>
                <InputItem onChange={v => this.handleChange('company', v)}>公司名称</InputItem>
                <InputItem onChange={v => this.handleChange('money', v)}>薪资范围</InputItem>
                <TextareaItem
                    onChange={v => this.handleChange('description', v)}
                    title="职位简介"
                    rows="3"
                    autoHeight
                ></TextareaItem>
                <WhiteSpace />
                <WhiteSpace />
                <WingBlank>
                    <Button type="primary">保存</Button>
                </WingBlank>
            </div>
        )
    }
}

export default BossInfo;