import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

// AuthRouter 组件主要做登录校验
// 1) 当前是否登录
// 2) 登录的页面路由是否是 login
// 3) 用户的身份 type 是牛人还是 BOSS
// 4) 用户是否完善了头像

// 当前组件不是 Route 组件, 所以需要使用 react-touter-dom 中的 withRouter 装饰器
// 把路由相关的方法带入到当前组件的属性中
@withRouter
class AuthRouter extends React.Component {
    componentDidMount() {
        const publicList = ['/login', '/register'];
        const pathName = this.props.location.pathname;
        if (publicList.indexOf(pathName) > -1) {
            return null
        }
        axios.get('/user/info')
            .then(res => {
                if(res.status === 200) {
                    if(res.data.code === 0) {
                        // 有登录信息
                        console.log('已登录')
                    } else {
                        this.props.history.push('/login');
                    }
                }
            })
    }
    render() {
        return null
    }
}

export default AuthRouter;