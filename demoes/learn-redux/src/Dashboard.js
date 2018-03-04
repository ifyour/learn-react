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
class Page404 extends React.Component {
    constructor() {
        super()
    }
    render() {
        console.log(this.props);
        return <h2>Page Not Found! </h2>;
    }
}


@connect(
    state => state.auth,
    { logout }
)


class Dashboard extends React.Component {
    constructor (props) {
        super(props)
    }
    render() {
        console.log(this.props)
        const redirectToLogin = <Redirect to='/login'></Redirect>
        const app = (
            <div>
                <h2>控制面板</h2>
                <ul>
                    <li><Link to='/dashboard/'>一营</Link></li>
                    <li><Link to='/dashboard/two'>二营</Link></li>
                    <li><Link to='/dashboard/three'>三营</Link></li>
                </ul>

                <Route path='/dashboard/' exact component={ App }></Route>
                <Route path='/dashboard/two' component={ TeamTwo }></Route>
                <Route path='/dashboard/three' component={ TeamThree }></Route>
            </div>
        )
        return this.props.isAuth ? app : redirectToLogin;
    }
}

export default Dashboard