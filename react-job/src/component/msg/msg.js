import React from 'react';
import { connect } from 'react-redux';
import { List, Badge } from 'antd-mobile';

@connect(
    state => state
)
class Msg extends React.Component {

    _getLast(arr) {
        return arr[arr.length - 1]
    }
    
    render() {
        let msgGroup = {};
        const Item = List.Item;
        const Brief = Item.Brief;
        const userId = this.props.user._id;
        const userInfo = this.props.chat.users
        this.props.chat.chatmsg.forEach(v=>{
            // 第一次不存在, 给一个空数组, 第二次把本身赋给自己
            msgGroup[v.chatid] = msgGroup[v.chatid] || [];
            // 每次推送一次 chatmsg 的内容
            msgGroup[v.chatid].push(v);
        })
        // 把对象的 value 取出来保存数组
        const chatList = Object.values(msgGroup);
        
        chatList.sort((a, b) => {
            const a_last = this._getLast(a).create_time;
            const b_last = this._getLast(b).create_time;
            return b_last - a_last;
        })
        return (
            <div id="message-list-page">
                {
                    chatList.map(v=>{
                        const lastItem = this._getLast(v);
                        const targetId = lastItem.from === userId ? lastItem.to : lastItem.from;
                        const unreadNum = v.filter(v=>!v.read && v.to === userId).length;
                        if (!Object.keys(userInfo[targetId]).length) {
                            return null
                        }
                        const name = userInfo[targetId].name || '';
                        const avatar = userInfo[targetId].avatar || '';
                        return  <List key={ lastItem._id }>
                                    <Item thumb={ require(`../avatar-selector/images/${avatar}.png`) }
                                        extra={ <Badge text={ unreadNum }></Badge> }
                                        arrow="horizontal"
                                        onClick={ ()=>this.props.history.push(`/chat/${targetId}`) }
                                    >
                                        { lastItem.content }
                                        <Brief>{ name }</Brief>
                                    </Item>
                                </List>
                    })
                }
            </div>
        )
    }
}

export default Msg