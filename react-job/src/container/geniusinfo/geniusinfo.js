import React from 'react';
import { NavBar, InputItem, TextareaItem, Button, WingBlank, WhiteSpace } from 'antd-mobile';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import AvatarSelector from '../../component/avatar-selector/avatar-selector';
import { update } from '../../redux/user.redux';

@connect(
    state => state.user,
    { update }
)
class GeniusInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            avatar: '',
            title: '',
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
        const redirectTo = this.props.redirectTo;
        const currentPath = this.props.location.pathname;
        return (
            <div>
                { redirectTo && redirectTo !== currentPath ? <Redirect to={ this.props.redirectTo }/> : null }
                <NavBar mode="dark">牛人完善信息页</NavBar>
                <AvatarSelector avatarSelector={this.avatarSelector} />
                <WhiteSpace />
                <InputItem onChange={v => this.handleChange('title', v)}>求职岗位</InputItem>
                <TextareaItem
                    onChange={v => this.handleChange('description', v)}
                    title="个人简介"
                    rows="3"
                    autoHeight
                ></TextareaItem>
                <WhiteSpace />
                <WhiteSpace />
                <WingBlank>
                    <Button type="primary"
                        onClick={ () => this.props.update(this.state) }
                    >保存</Button>
                </WingBlank>
            </div>
        )
    }
}

export default GeniusInfo;