const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

const model = require('./model');
const Chat = model.getModel('chat');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// io 是 socket.io 全局实例
io.on('connection', (socket)=>{
  // socket 当前连接实例
  socket.on('sendMsg', (data)=>{
    const { from, to, msg } = data;
    const chatid = [from, to].sort().join('_');
    Chat.create({ chatid, from, to, content: msg }, (err, doc) =>{
        if (!err) {
            // 全局广播所有监听 receiveMsg 的实例，并且接受参数
            io.emit('receiveMsg', Object.assign({}, doc._doc));
        }
    })
  })
})

const userRouter = require('./user');

app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user', userRouter);

// 路由拦截操作，用于服务端配置上线
app.use((req, res, next) => {
  // 如果访问的是 user || static 那么继续执行下一个中间件，否则就相应首页
  if (req.url.startsWith('/user/') || req.url.startsWith('/static/')) {
    return next();
  }
  // path.resolve 转为物理绝对路径
  return res.sendFile(path.resolve('build/index.html'));
})
// 把 build 目录设置为静态资源目录
app.use('/', express.static(path.resolve('build')));


server.listen(9093, () => {
  console.log('Server starting at http://localhost:9093/');
})