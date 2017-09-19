import React from 'react';
import { render } from 'react-dom';
// 引入组件
// import HelloWorld from './Helloworld';
// import Button from './Button';
// import App from './App';
import News from './News'

const root = document.querySelector('#root');

render(
    // <HelloWorld name1="ifyour" name2="Tom"/>,
    <News />,
    root
);