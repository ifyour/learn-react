import React from 'react';
import { List, InputItem, NavBar, Icon } from 'antd-mobile';
import { connect } from 'react-redux';

import { getMsgList, sendMsg, recvMsg, removeRecvMsg } from '../../redux/chat.redux';
import { getChatAboutMe } from '../../utils/util';

@connect(
    state=>state,
    { getMsgList, sendMsg, recvMsg, removeRecvMsg }
)
class Chat extends React.Component {
    
    state = {
        text: ''
    }

    componentWillMount() {
        // 如果用户头像数据为空, 那么说明还未获取过消息列表数据
        const users = this.props.chat.users;
        if (!Object.keys(users).length) {
            this.props.getMsgList();
            this.props.recvMsg();
        }
    }

    componentWillUnmount() {
        // 该页销毁时, 清除当页的消息监听
        this.props.removeRecvMsg()
    }

    handleSubmit() {
        const from = this.props.user._id;
        const to = this.props.match.params.user;
        const msg = this.state.text;
        msg && this.props.sendMsg({ from, to, msg });
        this.setState({ text: '' })
    }

    render() {
        const toUserId = this.props.match.params.user;
        const users = this.props.chat.users;
        const Item = List.Item;
        if (!users[toUserId]) {// 所有用户中未找到当前用户信息
            return null
        }
        // 过滤只要和当前正在聊天的用户的数据
        const chatMsg = this.props.chat.chatmsg.filter(v=>v.chatid === getChatAboutMe(this.props.user._id, toUserId))
        return (
            <div id="chat-page">
                <NavBar 
                    mode="dark"
                    icon={ <Icon type="left"></Icon> }
                    onLeftClick={ ()=>this.props.history.goBack() }
                >{ users[toUserId].name }</NavBar>
                { chatMsg.map(v => {
                    const avatarURL = require(`../avatar-selector/images/${users[v.from].avatar}.png`)
                    return v.from !== toUserId
                            ? <List key={v._id}><Item className="chat-me" extra={<img src={ avatarURL } alt=""/>}>{v.content}</Item></List>
                            : <List key={v._id}><Item thumb={ avatarURL }>{v.content}</Item></List>
                }) }
                 <div className="stick-footer">
                    <List>
                        <InputItem 
                            placeholder="请输入信息"
                            value={ this.state.text }
                            onChange={ v=>this.setState({ text: v }) }
                            extra={ <span onClick={ ()=>this.handleSubmit() }>发送</span> }
                        ></InputItem>
                    </List>
                </div>
            </div>
        )
    }
}

export default Chat;