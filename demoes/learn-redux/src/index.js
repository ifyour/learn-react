import React from "react";
import ReactDom from "react-dom";
import { createStore, applyMiddleware, compose } from 'redux';

// Redux 默认只能处理同步, 异步任务需要 react-thunk 中间件
import thunk from 'redux-thunk';

// react-redux 是用来优雅连接  react 和 redux 的中间件
import { Provider } from 'react-redux';


import { counter } from './index.redux.js';
import App from "./App";

// 使用 redux 提供的 applyMiddleware 来处理异步
// compose 用来混合 2 个函数
const store = createStore(counter, compose(
    applyMiddleware(thunk), 
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

ReactDom.render(
    <Provider store={ store }>
        <App />
    </Provider>,
    document.getElementById('root')
); 
