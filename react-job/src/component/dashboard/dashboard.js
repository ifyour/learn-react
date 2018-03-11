import React from 'react';
import { connect } from 'react-redux';
import { NavBar } from 'antd-mobile';
import { Switch, Route } from 'react-router-dom';

import NavLink from '../navlink/navlink';
import Boss from '../boss/boss';

function Genius() {
    return <h2>Genius 首页</h2>
}
function Msg() {
    return <h2>Msg</h2>
}
function Me() {
    return <h2>Me</h2>
}

@connect(
    state => state
)
class Dashboard extends React.Component {
    render(){
        const { pathname } = this.props.location;
        const { user } = this.props;
        const navList = [
            {
                path: '/boss',
                text: '牛人',
                icon: 'boss',
                title: '寻找牛人',
                component: Boss,
                hide: user.type === 'genius'
            },
            {
                path: '/genius',
                text: 'BOSS',
                icon: 'genius',
                title: '寻找 BOSS',
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
                component: Me
            }
        ];
        return (
            <div>
                <NavBar className="fixed-header" mode="dard">{ navList.find(v => v.path === pathname).title }</NavBar>
                <div className="page-center">
                    <Switch>
                        {
                            navList.map(v=>(
                                <Route key={ v.path } path={ v.path } component={ v.component } ></Route>
                            ))
                        }
                    </Switch>
                </div>
                <NavLink data={ navList }></NavLink>
            </div>
        )
    }
}

export default Dashboard