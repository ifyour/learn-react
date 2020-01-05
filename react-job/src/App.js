import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './container/login/login';
import Register from './container/register/register';
import BossInfo from './container/bossinfo/bossinfo';
import AuthRouter from './component/authrouter/authrouter';
import GeniusInfo from './container/geniusinfo/geniusinfo';
import Dashboard from './component/dashboard/dashboard';
import Chat from './component/chat/chat';

class App extends React.Component {
    render() {
        return (
            <div>
                <AuthRouter />
                <Switch>
                    <Route path="/bossinfo" component={ BossInfo }></Route>
                    <Route path="/geniusinfo" component={ GeniusInfo }></Route>
                    <Route path="/login" component={ Login }></Route>
                    <Route path="/register" component={ Register }></Route>
                    <Route path="/chat/:user" component={ Chat }></Route>
                    <Route component={ Dashboard }></Route>
                </Switch>
            </div>
        )
    }
}

export default App;