import React from 'react'
import { Route, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import App from "./App";
import { logout } from './Auth.redux';

function TeamThree() {
    return <h2>三营</h2>
}
function TeamTwo() {
    return <h2>二营</h2>
}
// class Page404 extends React.Component {
//     constructor() {
//         super()
//     }
//     render() {
//         console.log(this.props);
//         return <h2>Page Not Found! </h2>;
//     }
// }

@connect(
    state => state.auth,
    { logout }
)
class Dashboard extends React.Component {
    render() {
        // 匹配路由信息，子组件配置路由，需要绝对地址，父级传来的 /dashboard 要继续挨着写
        const { match } = this.props;
        const redirectToLogin = <Redirect to='/login'></Redirect>
        const app = (
            <div>
                <h2>控制面板</h2>
                <button onClick={ this.props.logout }>注销</button>
                <ul>
                    <li><Link to={`${ match.url }/`}>一营</Link></li>
                    <li><Link to={`${ match.url }/two`}>二营</Link></li>
                    <li><Link to={`${ match.url }/three`}>三营</Link></li>
                </ul>

                <Route path={`${ match.url }/`} exact component={ App }></Route>
                <Route path={`${ match.url }/two`} component={ TeamTwo }></Route>
                <Route path={`${ match.url }/three`} component={ TeamThree }></Route>
            </div>
        )
        return this.props.isAuth ? app : redirectToLogin;
    }
}

export default Dashboard