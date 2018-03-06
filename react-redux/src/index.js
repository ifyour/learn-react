import React from "react";
import ReactDom from "react-dom";
// 更多方法参考文档: Redux 中文文档 https://www.kancloud.cn/allanyu/redux-in-chinese/82399
import { createStore, applyMiddleware, compose } from 'redux';
// Redux 默认只能处理同步, 异步任务需要 react-thunk
import thunk from 'redux-thunk';
// react-redux 用来优雅连接  react 和 redux
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import reducers from './reducer'
import Auth from './Auth';
import Dashboard from './Dashboard';
import './config';
// 使用 redux 提供的 applyMiddleware 来处理异步
// compose 用来混合 2 个函数
const store = createStore(reducers, compose(
    applyMiddleware(thunk), 
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

ReactDom.render(
    <Provider store={ store }>
        <BrowserRouter>
            <Switch>
                <Route path='/login' exact component={ Auth }></Route>
                <Route path='/dashboard' component={ Dashboard }></Route>
                <Redirect to='/dashboard'></Redirect>
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
); 
