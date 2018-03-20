import React from 'react';
import { connect } from 'react-redux';
import { NavBar } from 'antd-mobile';
import { Switch, Route } from 'react-router-dom';
import QueueAnim from 'rc-queue-anim';

import NavLink from '../navlink/navlink';
import Boss from '../boss/boss';
import Genius from '../genius/genius';
import UserCenter from '../usercenter/usercenter';
import Msg from '../msg/msg'
import { getMsgList, recvMsg } from '../../redux/chat.redux';

@connect(
    state => state,
    { getMsgList, recvMsg }
)
class Dashboard extends React.Component {

    componentDidMount() {
        this.props.getMsgList();// 获取与我相关的所有消息和所有用户头像数据
        this.props.recvMsg();// 开始监听 socket 接收消息事件
    }

    render(){
        const { pathname } = this.props.location;
        const { user } = this.props;
        const navList = [
            {
                path: '/boss',
                text: '牛人',// TabBar 文字
                icon: 'boss',
                title: '牛人列表',// NavBar 标题
                component: Boss,
                hide: user.type === 'genius'
            },
            {
                path: '/genius',
                text: 'BOSS',
                icon: 'genius',
                title: 'BOSS 列表',
                component: Genius,
                hide: user.type === 'boss'
            },
            {
                path: '/msg',
                text: '消息',
                icon: 'msg',
                title: '个人消息',
                component: Msg
            },
            {
                path: '/me',
                text: '我',
                icon: 'user',
                title: '个人中心',
                component: UserCenter
            }
        ];
        // 查找出当前 Nav
        const curNavItem = navList.find(v => v.path === pathname);
        return (
            <div>
                <NavBar className="fixed-header" mode="dard">
                    { curNavItem ? curNavItem.title : null }
                </NavBar>
                <div className="page-center">
                    <QueueAnim delay={ 100 } type="alpha">
                        <Route key={ curNavItem.path } path={ curNavItem.path } component={ curNavItem.component } ></Route>
                    </QueueAnim>
                </div>
                <NavLink data={ navList }></NavLink>
            </div>
        )
    }
}

export default Dashboard