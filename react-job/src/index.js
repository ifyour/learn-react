import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import App from './App';
import reducers from './redux';
import './utils/axios.config';
import './style/index.css';

const store = createStore(reducers, compose(
    applyMiddleware(thunk), 
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

const renderMethod = module.hot ? ReactDom.render : ReactDom.hydrate;
renderMethod(
    <Provider store={ store }>
        <BrowserRouter>
            <App /> 
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
); 
