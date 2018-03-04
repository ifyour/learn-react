import React from "react";
import ReactDom from "react-dom";

// 更多方法参考文档: Redux 中文文档 https://www.kancloud.cn/allanyu/redux-in-chinese/82399
import { createStore, applyMiddleware, compose } from 'redux';

// Redux 默认只能处理同步, 异步任务需要 react-thunk
import thunk from 'redux-thunk';

// react-redux 用来优雅连接  react 和 redux
import { Provider } from 'react-redux';

import { BrowserRouter, Route, Link } from 'react-router-dom'


import { counter } from './index.redux.js';
import App from "./App";

// 使用 redux 提供的 applyMiddleware 来处理异步
// compose 用来混合 2 个函数
const store = createStore(counter, compose(
    applyMiddleware(thunk), 
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

function TeamThree() {
    return <h2>三营</h2>
}
function TeamTwo() {
    return <h2>二营</h2>
}


ReactDom.render(
    <Provider store={ store }>
        <BrowserRouter>
            <div>
                <h2>导航</h2>
                <ul>
                    <li><Link to='/'>一营</Link></li>
                    <li><Link to='/two'>二营</Link></li>
                    <li><Link to='/three'>三营</Link></li>
                </ul>

                <Route path='/' exact component={ App }></Route>
                <Route path='/two' component={ TeamTwo }></Route>
                <Route path='/three' component={ TeamThree }></Route>

            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
); 
