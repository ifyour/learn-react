import path from 'path';
import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import socketio from 'socket.io';

import model from './model';
import userRouter from './user';
const Chat = model.getModel('chat');
const app = express();
const server = http.Server(app);
const io = socketio(server);

// SSR 配置----------------------------------------------start
import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { renderToString, renderToNodeStream } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import reducers from '../src/redux';
import csshook from 'css-modules-require-hook/preset';
import assethook from 'asset-require-hook';
import staticPath from '../build/asset-manifest.json';
import App from '../src/app';
assethook({ 
    extensions: ['png'],
    limit: 25000// 小于25kb的图片转成 data URI
});
app.use((req, res, next) => {
    if (req.url.startsWith('/user/') || req.url.startsWith('/static/')) {
        return next();// 执行下一个中间件
    }
    const store = createStore(reducers, compose(
        applyMiddleware(thunk)
    ));
    let context = {};
    res.write(`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="theme-color" content="#000000">
        <title>React App</title>
        <link rel="stylesheet" href="${staticPath['main.css']}">
      </head>
      <body>
        <noscript>
          You need to enable JavaScript to run this app.
        </noscript>
        <div id="root">`)
    // const markup = renderToString((
    //     <Provider store={store}>
    //         <StaticRouter location={req.url} context={context}>
    //             <App />
    //         </StaticRouter>
    //     </Provider>
    // ))
    const markupStream = renderToNodeStream((
        <Provider store={store}>
            <StaticRouter location={req.url} context={context}>
                <App />
            </StaticRouter>
        </Provider>
    ))
    markupStream.pipe(res, { end: false })
    markupStream.on('end', () => {
        res.write(`</div>
                <script src="${staticPath['main.js']}"></script>
            </body>
        </html>`)
        res.end();
    })
//     const pageHtml = `<!DOCTYPE html>
//   <html lang="en">
//     <head>
//       <meta charset="utf-8">
//       <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
//       <meta name="theme-color" content="#000000">
//       <title>React App</title>
//       <link rel="stylesheet" href="${staticPath['main.css']}">
//     </head>
//     <body>
//       <noscript>
//         You need to enable JavaScript to run this app.
//       </noscript>
//       <div id="root">${markup}</div>
//       <script src="${staticPath['main.js']}"></script>
//     </body>
//   </html>
//   `
    // return res.send(pageHtml); // 渲染经过 renderToString 转过后的 HTML 代码
    // return res.sendFile(path.resolve('build/index.html'));
})
app.use('/', express.static(path.resolve('build')));
// SSR 配置----------------------------------------------end

// io 是 socket.io 全局实例
io.on('connection', (socket) => {
    // socket 当前连接实例
    socket.on('sendMsg', (data) => {
        const { from, to, msg } = data;
        const chatid = [from, to].sort().join('_');
        Chat.create({ chatid, from, to, content: msg }, (err, doc) => {
            if (!err) {
                // 全局广播所有监听 receiveMsg 的实例，并且接受参数
                io.emit('receiveMsg', Object.assign({}, doc._doc));
            }
        })
    })
})

app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user', userRouter);

server.listen(9093, () => {
    console.log('Server starting at http://localhost:9093/');
})