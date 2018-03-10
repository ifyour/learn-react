import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import './config';
import './index.css';
import reducers from './reducers';
import Login from './container/login/login';
import Register from './container/register/register';
import BossInfo from './container/bossinfo/bossinfo';
import AuthRouter from './component/authrouter/authrouter';
import GeniusInfo from './container/geniusinfo/geniusinfo';

const store = createStore(reducers, compose(
    applyMiddleware(thunk), 
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

function Boss() {
    return <h2>BOSS 页面</h2>
}

ReactDom.render(
    <Provider store={ store }>
        <BrowserRouter>
            <div>
                <AuthRouter />
                <Switch>
                    <Route path="/bossinfo" component={ BossInfo }></Route>
                    <Route path="/geniusinfo" component={ GeniusInfo }></Route>
                    <Route path="/boss" component={ Boss }></Route>
                    <Route path="/login" component={ Login }></Route>
                    <Route path="/register" component={ Register }></Route>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
); 
