import React from 'react';
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile';
import { connect } from 'react-redux';

import { getMsgList, sendMsg, recvMsg, removeRecvMsg, setReadMsg } from '../../redux/chat.redux';
import { getChatAboutMe } from '../../utils/util';

@connect(
    state=>state,
    { getMsgList, sendMsg, recvMsg, removeRecvMsg, setReadMsg }
)
class Chat extends React.Component {
    
    state = {
        text: '',
        showEmoji: false
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
        // 离开当前页的时候, 把当前页的消息标记为已读
        const curChatTarget = this.props.match.params.user;
        this.props.setReadMsg(curChatTarget);
    }

    handleSubmit() {
        const from = this.props.user._id;
        const to = this.props.match.params.user;
        const msg = this.state.text;
        msg && this.props.sendMsg({ from, to, msg });
        this.setState({ text: '' })
    }

    fixCarousel() {
        setTimeout(()=>{
            window.dispatchEvent(new Event('resize'));
        }, 0)
    }

    render() {
        const emoji = "⊙▂⊙|⊙０⊙|⊙︿⊙|⊙ω⊙|⊙﹏⊙|⊙△⊙|⊙▽⊙|∩▂∩|∩０∩|∩︿∩|∩ω∩|∩﹏∩|∩△∩|∩▽∩|●▂●||●０●||●︿●||●ω●||●﹏●||●△● |●▽●|∪▂∪|∪０∪|∪︿∪|∪ω∪|∪﹏∪|∪△∪|∪▽∪|≧▂≦|≧０≦|≧︿≦|≧ω≦|≧﹏≦|≧△≦|≧▽≦|＞▂＜|＞０＜|＞︿＜|＞ω＜|＞﹏＜|＞△＜|＞▽＜|╯▂╰|╯０╰|╯︿╰|╯ω╰|╯﹏╰|╯△╰|╯▽╰|＋▂＋|＋０＋|＋︿＋|＋ω＋|＋﹏＋ ＋△＋|＋▽＋|ˋ▂ˊ|ˋ０ˊ|ˋ︿ˊ|ˋωˊ|ˋ﹏ˊ|ˋ△ˊ|ˋ▽ˊ|ˇ▂ˇ|ˇ０ˇ|ˇ︿ˇ|ˇωˇ|ˇ﹏ˇ||ˇ△ˇ|ˇ▽ˇ|˙▂˙|˙０˙|˙︿˙|˙ω˙|˙﹏˙|˙△˙|˙▽˙"
            .split('|')
            .filter(v=>v)
            .map(v=> ({ text: v }));
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
                            extra={ 
                                <div>
                                    <span style={ {marginRight: '10px'} } 
                                        role="img"
                                        aria-labelledby="jsx-a11y/accessible-emoji"
                                        onClick={ ()=>{
                                            this.fixCarousel();
                                            this.setState({ showEmoji: !this.state.showEmoji })
                                        } }
                                    >😍</span>
                                    <span onClick={ ()=>this.handleSubmit() }>发送</span>
                                </div>
                            }
                        ></InputItem>
                    </List>
                    {
                        this.state.showEmoji
                            ?  <Grid data={ emoji } 
                                     columnNum={ 9 } 
                                     isCarousel={ true } 
                                     carouselMaxRow={ 4 }
                                     onClick={ el=>{
                                         this.setState({
                                             text: this.state.text + el.text
                                         })
                                     } }
                                />
                            : null
                    }
                </div>
            </div>
        )
    }
}

export default Chat;