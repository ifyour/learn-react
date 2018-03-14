const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const model = require('./model');
const Chat = model.getModel('chat');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);


io.on('connection', (curSocket)=>{
  curSocket.on('sendMsg', (data)=>{
    const { from, to, msg } = data;
    const chatid = [from, to].sort().join('_');

    Chat.create({ chatid, from, to, content: msg }, (err, doc) =>{
        if (!err) {
            io.emit('receiveMsg', Object.assign({}, doc._doc));
        }
    })
  })
})

const userRouter = require('./user');

app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user', userRouter);

server.listen(9093, () => {
  console.log('Server starting at http://localhost:9093/');
})