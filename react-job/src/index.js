import React from "react";
import ReactDom from "react-dom";
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import Login from './container/login/index';
import Register from './container/register/index';
import reducers from './reducers';
import './config';
import AuthRouter from './component/authrouter/authrouter';

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
                <Route path="/boss" component={ Boss }></Route>
                <Route path="/login" component={ Login }></Route>
                <Route path="/register" component={ Register }></Route>
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
); 
