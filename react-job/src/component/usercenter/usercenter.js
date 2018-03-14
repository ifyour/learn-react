import React from 'react';
import { connect } from 'react-redux';
import browserCookies from 'browser-cookies';
import { Result, List, WhiteSpace, Modal } from 'antd-mobile';
import { Redirect } from 'react-router-dom';

import { logoutSubmit } from '../../redux/user.redux';

@connect(
    state => state.user,
    { logoutSubmit }
)
class User extends React.Component {
    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this)
    }

    logout() {
        const alert = Modal.alert;
        alert('注销', <div>确认退出?</div>, [
            { text: '取消', onPress: () => null },
            { text: '确认', onPress: () => {
                browserCookies.erase('userid')
                this.props.logoutSubmit();
            } }
          ])
    }

    render() {
        const avatarStyle = { width: 60, borderRadius: '50%'};
        const Item = List.Item;
        const Brief = Item.Brief;

        return this.props.user ? (
            <div>
                <Result
                    img={ <img style={ avatarStyle } src={ require(`../avatar-selector/images/${this.props.avatar}.png`) } alt="" /> }
                    title={ this.props.user }
                    message={ this.props.type === 'boss' ? this.props.company : null }
                />
                <List renderHeader={ ()=>'简介' }>
                    <Item multipleLine>
                        { this.props.title }
                        { this.props.description.split('\n').map( v=><Brief key={v}>{v}</Brief>) }
                        { this.props.money ? <Brief>{ this.props.money }</Brief> : null}
                    </Item>
                </List>
                <WhiteSpace />
                <List>
                    <Item onClick={ this.logout }>退出登录</Item>
                </List>
            </div>
        ) : <Redirect to={ this.props.redirectTo } />
    }
}

export default User